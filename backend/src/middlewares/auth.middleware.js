const jwt = require("jsonwebtoken");
const prisma = require("../prisma/client");

const JWT_SECRET = process.env.JWT_SECRET || "klinik_laktasi_rahasia";

const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Token tidak ditemukan" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, JWT_SECRET);

    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: { id: true, nama: true, email: true, role: true }
    });

    if (!user) {
      return res.status(401).json({ error: "User tidak ditemukan" });
    }

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Token tidak valid" });
  }
};

module.exports = { authenticate };
