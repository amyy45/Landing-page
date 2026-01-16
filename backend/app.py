from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)

@app.before_request
def debug_request():
    print("➡️ Incoming:", request.method, request.path)

# ================================
# PostgreSQL configuration
# ================================
DATABASE_URL = os.getenv("DATABASE_URL")

if not DATABASE_URL:
    raise RuntimeError("DATABASE_URL is not set. PostgreSQL is required.")

# Render gives postgres://, SQLAlchemy needs postgresql://
if DATABASE_URL.startswith("postgres://"):
    DATABASE_URL = DATABASE_URL.replace("postgres://", "postgresql://", 1)

app.config["SQLALCHEMY_DATABASE_URI"] = DATABASE_URL
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

print("USING DB:", app.config["SQLALCHEMY_DATABASE_URI"])

db = SQLAlchemy(app)

# ================================
# Models
# ================================
class Lead(db.Model):
    __tablename__ = "lead"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), nullable=False)
    phone = db.Column(db.String(20), nullable=False)

# ================================
# Routes
# ================================
@app.route("/leads", methods=["POST"])
def create_lead():
    try:
        data = request.get_json(force=True)

        if not all(k in data for k in ("name", "email", "phone")):
            return jsonify({"error": "Missing required fields"}), 400

        lead = Lead(
            name=data["name"],
            email=data["email"],
            phone=data["phone"]
        )

        db.session.add(lead)
        db.session.commit()

        return jsonify({
            "message": "Lead created successfully",
            "id": lead.id
        }), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500


@app.route("/leads", methods=["GET"])
def get_leads():
    leads = Lead.query.all()
    return jsonify([
        {
            "id": l.id,
            "name": l.name,
            "email": l.email,
            "phone": l.phone
        } for l in leads
    ])


@app.route("/health")
def health():
    return jsonify({"status": "healthy"}), 200


# ================================
# App start
# ================================
if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=True, port=5050)
