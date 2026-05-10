from pydantic import BaseModel, Field
from typing import Optional

class PurchaseCreate(BaseModel):
    material_id: int
    supplier_id: int
    quantity: float = Field(
        gt=0,
        description="Purchase quantity"
    )
    price: float = Field(
        gt=0,
        description="Price per unit"
    )
    # optional workflow status
    status: Optional[str] = "pending"
    class Config:
        from_attributes = True