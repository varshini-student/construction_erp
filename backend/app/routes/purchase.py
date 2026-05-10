from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy.exc import SQLAlchemyError
from app.schemas.purchase import PurchaseCreate
from app.utils.deps import get_db, manager_only
from app.services.purchase_service import create_purchase_service

router = APIRouter()


@router.post("/")
def create_purchase(
    data: PurchaseCreate,
    db: Session = Depends(get_db),
    current_user=Depends(manager_only)
):
    try:
        purchase = create_purchase_service(
            db,
            data
        )
        return {
            "message": "Purchase created successfully",
            "purchase_id": purchase.id,
            "total_amount": purchase.total_amount
        }
    except SQLAlchemyError as e:
        db.rollback()
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )