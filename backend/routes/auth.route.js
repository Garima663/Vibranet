import express from 'express'
import { handleLogin, handleLogout, handleOnboarding, handleSignup } from '../controllers/auth.controller.js'
import { protectRoute } from '../middleware/auth.middleware.js'

const router = express.Router()

router.post('/signup', handleSignup)
router.post('/login', handleLogin)
router.post('/logout', handleLogout)

router.post('/onboarding', protectRoute, handleOnboarding)

//check if user is logged in 
router.get('/me', protectRoute, (req,res) => {
   res.status(200).json({success: true, user: req.user})
})

export default router