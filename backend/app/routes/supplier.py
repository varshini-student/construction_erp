from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.models.supplier import Supplier
from app.schemas.supplier import (
    SupplierCreate,
    SupplierResponse
)
from app.utils.deps import (
    get_db,
    admin_only
)
router = APIRouter(
    tags=["Suppliers"]
)
# create supplier
@router.post(
    "/",
    response_model=SupplierResponse
)
def create_supplier(
    data: SupplierCreate,
    db: Session = Depends(get_db),
    user=Depends(admin_only)
):
    # check duplicate supplier
    existing_supplier = db.query(Supplier).filter(
        Supplier.name == data.name
    ).first()

    if existing_supplier:

        raise HTTPException(
            status_code=400,
            detail="Supplier already exists"
        )

    supplier = Supplier(
        name=data.name,
        contact=data.contact,
        address=data.address
    )
    db.add(supplier)
    db.commit()
    db.refresh(supplier)
    return supplier


# get all suppliers
@router.get(
    "/",
    response_model=list[SupplierResponse]
)
def get_all_suppliers(
    db: Session = Depends(get_db)
):
    suppliers = db.query(Supplier).all()
    return suppliers