from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func
from app.models.stock import StockIn
from app.utils.deps import get_db

router = APIRouter()

@router.get("/total-expense")
def total_expense(db: Session = Depends(get_db)):
    total = db.query(func.sum(StockIn.quantity * StockIn.price)).scalar() or 0
    return {"total_expense": total}