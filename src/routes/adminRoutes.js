const express = require('express');
const router = express.Router();
const { authenticate, isAdmin } = require('../middleware/auth');
const prisma = require('../config/db');

// Get all users - requires admin role
router.get('/users', authenticate, isAdmin, async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true
      }
    });
    
    res.status(200).json({ users });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user by id - requires admin role
router.get('/users/:id', authenticate, isAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    
    const user = await prisma.user.findUnique({
      where: { id: Number(id) },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true
      }
    });
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.status(200).json({ user });
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update user role - requires admin role
router.patch('/users/:id/role', authenticate, isAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;
    
    if (!role || !['user', 'admin'].includes(role)) {
      return res.status(400).json({ message: 'Valid role is required' });
    }
    
    const user = await prisma.user.update({
      where: { id: Number(id) },
      data: { role },
      select: {
        id: true,
        name: true,
        email: true,
        role: true
      }
    });
    
    res.status(200).json({ 
      message: 'User role updated successfully',
      user
    });
  } catch (error) {
    console.error('Error updating user role:', error);
    if (error.code === 'P2025') {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 