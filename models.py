from extension import db

from werkzeug.security import (
    generate_password_hash,
    check_password_hash
)


# ==========================================
# USER MODEL
# ==========================================

class User(db.Model):

    __tablename__ = "users"

    id = db.Column(
        db.Integer,
        primary_key=True
    )

    name = db.Column(
        db.String(100),
        nullable=False
    )

    email = db.Column(
        db.String(120),
        unique=True,
        nullable=False
    )

    password_hash = db.Column(
        db.String(255),
        nullable=False
    )

    role = db.Column(
        db.String(20),
        default="user",
        nullable=False
    )

    created_at = db.Column(
        db.DateTime,
        default=db.func.current_timestamp()
    )

    # ==============================
    # Set Password
    # ==============================

    def set_password(self, password):

        self.password_hash = generate_password_hash(
            password
        )

    # ==============================
    # Check Password
    # ==============================

    def check_password(self, password):

        return check_password_hash(
            self.password_hash,
            password
        )


# ==========================================
# PRODUCT MODEL
# ==========================================

class Product(db.Model):

    __tablename__ = "products"

    id = db.Column(
        db.Integer,
        primary_key=True
    )

    name = db.Column(
        db.String(150),
        nullable=False
    )

    category = db.Column(
        db.String(100),
        nullable=False
    )

    price = db.Column(
        db.Float,
        nullable=False
    )

    old_price = db.Column(
        db.Float,
        nullable=True
    )

    description = db.Column(
        db.Text,
        nullable=True
    )

    image = db.Column(
        db.String(500),
        nullable=True
    )

    stock = db.Column(
        db.Integer,
        default=0,
        nullable=False
    )

    created_at = db.Column(
        db.DateTime,
        default=db.func.current_timestamp()
    )

# ==========================================
# ORDER MODEL
# ==========================================

class Order(db.Model):

    __tablename__ = "orders"

    id = db.Column(
        db.Integer,
        primary_key=True
    )

    user_id = db.Column(
        db.Integer,
        db.ForeignKey("users.id"),
        nullable=False
    )

    total_amount = db.Column(
        db.Float,
        nullable=False
    )

    status = db.Column(
        db.String(30),
        default="Pending",
        nullable=False
    )

    customer_name = db.Column(
        db.String(100),
        nullable=False
    )

    phone = db.Column(
        db.String(20),
        nullable=False
    )

    address = db.Column(
        db.Text,
        nullable=False
    )

    created_at = db.Column(
        db.DateTime,
        default=db.func.current_timestamp()
    )

    # User ke orders
    user = db.relationship(
        "User",
        backref=db.backref(
            "orders",
            lazy=True
        )
    )

    # Order ke products
    items = db.relationship(
        "OrderItem",
        backref="order",
        lazy=True,
        cascade="all, delete-orphan"
    )


# ==========================================
# ORDER ITEM MODEL
# ==========================================

class OrderItem(db.Model):

    __tablename__ = "order_items"

    id = db.Column(
        db.Integer,
        primary_key=True
    )

    order_id = db.Column(
        db.Integer,
        db.ForeignKey("orders.id"),
        nullable=False
    )

    product_id = db.Column(
        db.Integer,
        db.ForeignKey("products.id"),
        nullable=False
    )

    product_name = db.Column(
        db.String(150),
        nullable=False
    )

    price = db.Column(
        db.Float,
        nullable=False
    )

    quantity = db.Column(
        db.Integer,
        nullable=False
    )

    subtotal = db.Column(
        db.Float,
        nullable=False
    )

    # Product relation
    product = db.relationship(
        "Product",
        backref=db.backref(
            "order_items",
            lazy=True
        )
    )