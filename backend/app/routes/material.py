from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.models.material import Material
from app.schemas.material import (
    MaterialCreate,
    MaterialResponse
)
from app.utils.deps import (
    get_db,
    admin_only
)
router = APIRouter(
    tags=["Materials"]
)
# create material
@router.post(
    "/",
    response_model=MaterialResponse
)
def create_material(
    data: MaterialCreate,
    db: Session = Depends(get_db),
    user=Depends(admin_only)
):
    # check duplicate material
    existing_material = db.query(Material).filter(
        Material.name == data.name
    ).first()
    if existing_material:
        raise HTTPException(
            status_code=400,
            detail="Material already exists"
        )
    material = Material(
        name=data.name,
        unit=data.unit,
        minimum_stock=data.minimum_stock
    )
    db.add(material)
    db.commit()
    db.refresh(material)
    return material

# get all materials
@router.get(
    "/",
    response_model=list[MaterialResponse]
)
def get_all_materials(
    db: Session = Depends(get_db)
):
    materials = db.query(Material).all()
    return materials