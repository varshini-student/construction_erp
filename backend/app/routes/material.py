from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.models.material import Material
from app.schemas.material import (
    MaterialCreate,
    MaterialResponse
)
from sqlalchemy.exc import IntegrityError
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
    materials = db.query(Material).filter(
    Material.is_active == True
).all()
    return materials
@router.get(
    "/{material_id}",
    response_model=MaterialResponse
)
def get_material(
    material_id: int,
    db: Session = Depends(get_db)
):
    material = db.query(Material).filter(
        Material.id == material_id
    ).first()

    if not material:
        raise HTTPException(
            status_code=404,
            detail="Material not found"
        )

    return material

@router.put(
    "/{material_id}",
    response_model=MaterialResponse
)
def update_material(
    material_id: int,
    data: MaterialCreate,
    db: Session = Depends(get_db),
    user=Depends(admin_only)
):

    material = db.query(Material).filter(
        Material.id == material_id
    ).first()

    if not material:
        raise HTTPException(
            status_code=404,
            detail="Material not found"
        )

    material.name = data.name
    material.unit = data.unit
    material.minimum_stock = data.minimum_stock

    db.commit()
    db.refresh(material)

    return material
@router.delete("/{material_id}")
def delete_material(
    material_id: int,
    db: Session = Depends(get_db)
):
    material = db.query(Material).filter(
        Material.id == material_id
    ).first()

    if not material:
        raise HTTPException(
            status_code=404,
            detail="Material not found"
        )

    material.is_active = False

    db.commit()

    return {
        "message":
        "Material deactivated successfully"
    }