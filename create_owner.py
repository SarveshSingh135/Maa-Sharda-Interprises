from app import app
from extension import db
from models import User


with app.app_context():

    email = "owner@maasharda.com"

    owner = User.query.filter_by(email=email).first()

    if owner:
        print("⚠️ Owner already exists!")
        print("Role:", owner.role)

    else:
        owner = User(
            name="Maa Sharda Owner",
            email=email,
            role="owner"
        )

        owner.set_password("Owner@1234")

        db.session.add(owner)
        db.session.commit()

        print("✅ OWNER ACCOUNT CREATED!")
        print("Email: owner@maasharda.com")
        print("Password: Owner@1234")