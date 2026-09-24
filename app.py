from flask import Flask, render_template, request, redirect, url_for, session, flash

from extension import db
from models import User, Product, Order, OrderItem


app = Flask(__name__)


# ==============================
# SECRET KEY
# ==============================

app.secret_key = "maa-sharda-secret-key-2026"


# ==============================
# MYSQL DATABASE
# ==============================

# IMPORTANT:
# Apni existing SQLALCHEMY_DATABASE_URI wali line yahan same rakho.
app.config["SQLALCHEMY_DATABASE_URI"] = (
    "mysql+pymysql://root:MaaSharda2026@localhost/maa_sharda"
)

app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False


# ==============================
# DATABASE
# ==============================

db.init_app(app)


# ==============================
# CREATE TABLES
# ==============================

with app.app_context():
    db.create_all()


# ==============================
# HOME
# ==============================

@app.route("/")
def home():

    return render_template("index.html")


# ==============================
# PRODUCTS - USER SIDE
# ==============================

@app.route("/products")
def products():

    products = Product.query.order_by(
        Product.id.desc()
    ).all()

    return render_template(
        "products.html",
        products=products
    )


# ==========================================
# PRODUCT DETAILS
# ==========================================

@app.route("/product/<int:product_id>")
def product_details(product_id):

    product = Product.query.get_or_404(product_id)

    return render_template(
        "product-details.html",
        product=product
    )


# ==============================
# REGISTER
# ==============================

@app.route("/register", methods=["GET", "POST"])
def register():

    if request.method == "POST":

        name = request.form.get("name")
        email = request.form.get("email")
        password = request.form.get("password")

        existing_user = User.query.filter_by(
            email=email
        ).first()

        if existing_user:

            flash("Email already registered!")

            return redirect(
                url_for("register")
            )

        new_user = User(
            name=name,
            email=email,
            role="user"
        )

        new_user.set_password(password)

        db.session.add(new_user)

        db.session.commit()

        flash(
            "Registration successful! Please login."
        )

        return redirect(
            url_for("login")
        )

    return render_template(
        "register.html"
    )


# ==============================
# LOGIN
# ==============================

@app.route("/login", methods=["GET", "POST"])
def login():

    if request.method == "POST":

        email = request.form.get("email")
        password = request.form.get("password")

        user = User.query.filter_by(
            email=email
        ).first()

        if user and user.check_password(password):

            session["user_id"] = user.id
            session["user_name"] = user.name
            session["role"] = user.role

            # ==============================
            # OWNER
            # ==============================

            if user.role == "owner":

                return redirect(
                    url_for("owner_dashboard")
                )

            # ==============================
            # RETURN TO CHECKOUT AFTER LOGIN
            # ==============================

            if session.get("checkout_after_login"):

                session.pop(
                    "checkout_after_login",
                    None
                )

                return redirect(
                    url_for("checkout")
                )

            # ==============================
            # NORMAL USER
            # ==============================

            return redirect(
                url_for("user_dashboard")
            )

        flash(
            "Invalid email or password!"
        )

        return redirect(
            url_for("login")
        )

    return render_template(
        "login.html"
    )


# ==============================
# USER DASHBOARD
# ==============================

@app.route("/user-dashboard")
def user_dashboard():

    if "user_id" not in session:

        return redirect(
            url_for("login")
        )

    if session.get("role") != "user":

        return "Access Denied 🚫", 403

    return render_template(
        "user-dashboard.html",
        name=session.get("user_name")
    )


# ==============================
# OWNER DASHBOARD
# ==============================

@app.route("/owner-dashboard")
def owner_dashboard():

    if "user_id" not in session:

        return redirect(
            url_for("login")
        )

    if session.get("role") != "owner":

        return "Access Denied 🚫", 403

    return render_template(
        "owner-dashboard.html"
    )


# ==============================
# MANAGE USERS
# ==============================

@app.route("/manage-users")
def manage_users():

    if "user_id" not in session:

        return redirect(
            url_for("login")
        )

    if session.get("role") != "owner":

        return "Access Denied 🚫", 403

    users = User.query.order_by(
        User.id.desc()
    ).all()

    return render_template(
        "users.html",
        users=users
    )


# ==============================
# MANAGE PRODUCTS
# ==============================

@app.route("/manage-products")
def manage_products():

    if "user_id" not in session:

        return redirect(
            url_for("login")
        )

    if session.get("role") != "owner":

        return "Access Denied 🚫", 403

    products = Product.query.order_by(
        Product.id.desc()
    ).all()

    return render_template(
        "products-manage.html",
        products=products
    )


# ==============================
# ADD PRODUCT
# ==============================

@app.route("/add-product", methods=["GET", "POST"])
def add_product():

    # LOGIN CHECK

    if "user_id" not in session:

        return redirect(
            url_for("login")
        )

    # OWNER ONLY

    if session.get("role") != "owner":

        return "Access Denied 🚫", 403

    # FORM SUBMIT

    if request.method == "POST":

        name = request.form.get("name")
        category = request.form.get("category")
        price = request.form.get("price")
        old_price = request.form.get("old_price")
        description = request.form.get("description")
        image = request.form.get("image")
        stock = request.form.get("stock")

        # VALIDATE NUMBERS

        try:

            price = float(price)

            if old_price:

                old_price = float(old_price)

            else:

                old_price = None

            stock = int(stock)

        except (ValueError, TypeError):

            flash(
                "Please enter valid price and stock."
            )

            return redirect(
                url_for("add_product")
            )

        # CREATE PRODUCT

        new_product = Product(
            name=name,
            category=category,
            price=price,
            old_price=old_price,
            description=description,
            image=image,
            stock=stock
        )

        # SAVE TO MYSQL

        db.session.add(new_product)

        db.session.commit()

        flash(
            "Product added successfully! ✅"
        )

        return redirect(
            url_for("manage_products")
        )

    return render_template(
        "add-product.html"
    )


# ==============================
# EDIT PRODUCT
# ==============================

@app.route(
    "/edit-product/<int:product_id>",
    methods=["GET", "POST"]
)
def edit_product(product_id):

    # LOGIN CHECK

    if "user_id" not in session:

        return redirect(
            url_for("login")
        )

    # OWNER ONLY

    if session.get("role") != "owner":

        return "Access Denied 🚫", 403

    # FIND PRODUCT

    product = Product.query.get_or_404(
        product_id
    )

    # UPDATE PRODUCT

    if request.method == "POST":

        name = request.form.get("name")
        category = request.form.get("category")
        price = request.form.get("price")
        old_price = request.form.get("old_price")
        description = request.form.get("description")
        image = request.form.get("image")
        stock = request.form.get("stock")

        # VALIDATE NUMBERS

        try:

            price = float(price)

            if old_price:

                old_price = float(old_price)

            else:

                old_price = None

            stock = int(stock)

        except (ValueError, TypeError):

            flash(
                "Please enter valid price and stock."
            )

            return redirect(
                url_for(
                    "edit_product",
                    product_id=product_id
                )
            )

        # UPDATE DATABASE

        product.name = name
        product.category = category
        product.price = price
        product.old_price = old_price
        product.description = description
        product.image = image
        product.stock = stock

        db.session.commit()

        flash(
            "Product updated successfully! ✅"
        )

        return redirect(
            url_for("manage_products")
        )

    return render_template(
        "edit-product.html",
        product=product
    )


# ==============================
# DELETE PRODUCT
# ==============================

@app.route(
    "/delete-product/<int:product_id>",
    methods=["POST"]
)
def delete_product(product_id):

    # LOGIN CHECK

    if "user_id" not in session:

        return redirect(
            url_for("login")
        )

    # OWNER ONLY

    if session.get("role") != "owner":

        return "Access Denied 🚫", 403

    # FIND PRODUCT

    product = Product.query.get_or_404(
        product_id
    )

    # DELETE PRODUCT

    db.session.delete(product)

    db.session.commit()

    flash(
        "Product deleted successfully! 🗑️"
    )

    return redirect(
        url_for("manage_products")
    )


# ==========================================
# CART
# ==========================================

@app.route("/cart")
def cart():

    cart_data = session.get(
        "cart",
        {}
    )

    cart_items = []
    total = 0

    for product_id, quantity in cart_data.items():

        product = Product.query.get(
            int(product_id)
        )

        if product:

            quantity = int(quantity)

            subtotal = (
                product.price * quantity
            )

            cart_items.append({
                "product": product,
                "quantity": quantity,
                "subtotal": subtotal
            })

            total += subtotal

    return render_template(
        "cart.html",
        cart_items=cart_items,
        total=total
    )


# ==========================================
# ADD TO CART
# ==========================================

@app.route(
    "/cart/add/<int:product_id>",
    methods=["POST"]
)
def add_to_cart(product_id):

    product = Product.query.get_or_404(
        product_id
    )

    if product.stock <= 0:

        flash(
            "Product out of stock! ❌"
        )

        return redirect(
            url_for("products")
        )

    cart_data = session.get(
        "cart",
        {}
    )

    product_key = str(product_id)

    current_quantity = int(
        cart_data.get(
            product_key,
            0
        )
    )

    if current_quantity >= product.stock:

        flash(
            "Available stock se zyada quantity add nahi kar sakte. ❌"
        )

        return redirect(
            url_for("products")
        )

    cart_data[product_key] = (
        current_quantity + 1
    )

    session["cart"] = cart_data

    session.modified = True

    flash(
        f"{product.name} cart me add ho gaya! 🛒"
    )

    return redirect(
        url_for("cart")
    )


# ==========================================
# REMOVE FROM CART
# ==========================================

@app.route(
    "/cart/remove/<int:product_id>",
    methods=["POST"]
)
def remove_from_cart(product_id):

    cart_data = session.get(
        "cart",
        {}
    )

    product_key = str(product_id)

    if product_key in cart_data:

        del cart_data[product_key]

    session["cart"] = cart_data

    session.modified = True

    return redirect(
        url_for("cart")
    )


# ==========================================
# CLEAR CART
# ==========================================

@app.route(
    "/cart/clear",
    methods=["POST"]
)
def clear_cart():

    session["cart"] = {}

    session.modified = True

    return redirect(
        url_for("cart")
    )


# ==========================================
# CHECKOUT
# ==========================================

@app.route(
    "/checkout",
    methods=["GET", "POST"]
)
def checkout():

    # ==============================
    # LOGIN REQUIRED
    # ==============================

    if "user_id" not in session:

        session[
            "checkout_after_login"
        ] = True

        flash(
            "Please login before checkout."
        )

        return redirect(
            url_for("login")
        )

    # ==============================
    # GET CART
    # ==============================

    cart_data = session.get(
        "cart",
        {}
    )

    # EMPTY CART

    if not cart_data:

        flash(
            "Your cart is empty."
        )

        return redirect(
            url_for("cart")
        )

    cart_items = []
    total = 0

    # ==============================
    # CART PRODUCTS
    # ==============================

    for product_id, quantity in cart_data.items():

        product = Product.query.get(
            int(product_id)
        )

        if product:

            quantity = int(quantity)

            subtotal = (
                product.price * quantity
            )

            cart_items.append({
                "product": product,
                "quantity": quantity,
                "subtotal": subtotal
            })

            total += subtotal

    # ==============================
    # PLACE ORDER
    # ==============================

    if request.method == "POST":

        customer_name = request.form.get(
            "customer_name"
        )

        phone = request.form.get(
            "phone"
        )

        address = request.form.get(
            "address"
        )

        # VALIDATE FORM

        if (
            not customer_name
            or not phone
            or not address
        ):

            flash(
                "Please fill all checkout details."
            )

            return redirect(
                url_for("checkout")
            )

        # ==============================
        # CHECK STOCK AGAIN
        # ==============================

        for item in cart_items:

            if (
                item["quantity"]
                > item["product"].stock
            ):

                flash(
                    f"Not enough stock for {item['product'].name}."
                )

                return redirect(
                    url_for("cart")
                )

        # ==============================
        # CREATE ORDER
        # ==============================

        new_order = Order(

            user_id=session["user_id"],

            total_amount=total,

            status="Pending",

            customer_name=customer_name,

            phone=phone,

            address=address
        )

        db.session.add(
            new_order
        )

        db.session.flush()

        # ==============================
        # CREATE ORDER ITEMS
        # ==============================

        for item in cart_items:

            product = item["product"]

            quantity = item["quantity"]

            order_item = OrderItem(

                order_id=new_order.id,

                product_id=product.id,

                product_name=product.name,

                price=product.price,

                quantity=quantity,

                subtotal=item["subtotal"]
            )

            db.session.add(
                order_item
            )

            # REDUCE STOCK

            product.stock -= quantity

        # SAVE ORDER

        db.session.commit()

        # ==============================
        # CLEAR CART
        # ==============================

        session["cart"] = {}

        session.modified = True

        flash(
            "Order placed successfully! 🎉"
        )

        return redirect(
            url_for("my_orders")
        )

    # ==============================
    # CHECKOUT PAGE
    # ==============================

    return render_template(
        "checkout.html",
        cart_items=cart_items,
        total=total,
        user_name=session.get(
            "user_name"
        )
    )


# ==========================================
# MY ORDERS
# ==========================================

@app.route("/my-orders")
def my_orders():

    if "user_id" not in session:

        return redirect(
            url_for("login")
        )

    if session.get("role") != "user":

        return "Access Denied 🚫", 403

    orders = Order.query.filter_by(
        user_id=session["user_id"]
    ).order_by(
        Order.id.desc()
    ).all()

    return render_template(
        "my-orders.html",
        orders=orders
    )


# ==========================================
# MANAGE ORDERS - OWNER
# ==========================================

@app.route("/manage-orders")
def manage_orders():

    if "user_id" not in session:

        return redirect(
            url_for("login")
        )

    if session.get("role") != "owner":

        return "Access Denied 🚫", 403

    orders = Order.query.order_by(
        Order.id.desc()
    ).all()

    return render_template(
        "orders-manage.html",
        orders=orders
    )


# ==========================================
# UPDATE ORDER STATUS
# ==========================================

@app.route(
    "/update-order-status/<int:order_id>",
    methods=["POST"]
)
def update_order_status(order_id):

    if "user_id" not in session:

        return redirect(
            url_for("login")
        )

    if session.get("role") != "owner":

        return "Access Denied 🚫", 403

    order = Order.query.get_or_404(
        order_id
    )

    new_status = request.form.get(
        "status"
    )

    allowed_statuses = [
        "Pending",
        "Confirmed",
        "Shipped",
        "Delivered",
        "Cancelled"
    ]

    if new_status in allowed_statuses:

        order.status = new_status

        db.session.commit()

        flash(
            "Order status updated successfully! ✅"
        )

    return redirect(
        url_for("manage_orders")
    )


# ==============================
# LOGOUT
# ==============================

@app.route("/logout")
def logout():

    session.clear()

    return redirect(
        url_for("home")
    )


# ==============================
# DATABASE TEST
# ==============================

@app.route("/db-test")
def db_test():

    try:

        with db.engine.connect():

            return (
                "✅ MySQL Database Connected Successfully!"
            )

    except Exception as e:

        return (
            f"❌ Database Connection Failed: {e}"
        )


# ==============================
# RUN APP
# ==============================

if __name__ == "__main__":

    app.run(debug=True)