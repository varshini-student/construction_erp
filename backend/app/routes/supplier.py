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
    suppliers = db.query(Supplier).filter(
    Supplier.is_active == True
).all()
    return suppliers
@router.get(
    "/{supplier_id}",
    response_model=SupplierResponse
)
def get_supplier(
    supplier_id: int,
    db: Session = Depends(get_db)
):
    supplier = db.query(Supplier).filter(
        Supplier.id == supplier_id
    ).first()

    if not supplier:
        raise HTTPException(
            status_code=404,
            detail="Supplier not found"
        )

    return supplier
@router.put(
    "/{supplier_id}",
    response_model=SupplierResponse
)
def update_supplier(
    supplier_id: int,
    data: SupplierCreate,
    db: Session = Depends(get_db),
    user=Depends(admin_only)
):

    supplier = db.query(Supplier).filter(
        Supplier.id == supplier_id
    ).first()

    if not supplier:
        raise HTTPException(
            status_code=404,
            detail="Supplier not found"
        )

    supplier.name = data.name
    supplier.contact = data.contact
    supplier.address = data.address

    db.commit()
    db.refresh(supplier)

    return supplier

@router.delete("/{supplier_id}")
def delete_supplier(
    supplier_id: int,
    db: Session = Depends(get_db),
    user=Depends(admin_only)
):

    supplier = db.query(Supplier).filter(
        Supplier.id == supplier_id
    ).first()

    if not supplier:
        raise HTTPException(
            status_code=404,
            detail="Supplier not found"
        )

    supplier.is_active = False
    db.commit()

    return {
    "message":
    "Supplier deactivated successfully"
}