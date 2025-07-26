import { Router } from 'express';
const router = Router();

//redirect client (google auth)
router.get("/dashboard", (req, res) => {
    res.redirect("http://localhost:5173/dashboard");
});

export default router;
