import express from 'express';
import fs from 'fs';
import path from 'path';

const router = express.Router();

// Load NID data
const loadNIDData = () => {
  try {
    const dataPath = path.join(__dirname, '../../mock-data/NIDs.json');
    const rawData = fs.readFileSync(dataPath, 'utf8');
    return JSON.parse(rawData);
  } catch (error) {
    console.error('Error loading NID data:', error);
    return [];
  }
};

// Get all NIDs
router.get('/', (req, res) => {
  try {
    const nids = loadNIDData();
    res.json({
      success: true,
      count: nids.length,
      data: nids
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch NID data'
    });
  }
});

// Get NID by ID
router.get('/id/:id', (req, res) => {
  try {
    const nids = loadNIDData();
    const id = parseInt(req.params.id);
    const foundNid = nids.find((n: any) => n.id === id);
    
    if (!foundNid) {
      return res.status(404).json({
        success: false,
        error: 'NID not found'
      });
    }
    
    res.json({
      success: true,
      data: foundNid
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch NID data'
    });
  }
});

// Get NID info by nidnumber and dob using query params
router.post('/find', (req, res) => {
  try {
    const nids = loadNIDData();
    const { nidnumber, dob } = req.body;

    if (!nidnumber || !dob) {
      return res.status(400).json({
        success: false,
        error: 'Missing required query parameters: nidnumber and dob'
      });
    }

    const foundNid = nids.find(
      (n: any) => n.nid === nidnumber && n.date_of_birth === dob
    );

    if (!foundNid) {
      return res.status(404).json({
        success: false,
        error: 'NID not found'
      });
    }

    res.json({
      success: true,
      data: foundNid
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch NID data'
    });
  }
});

// Get NID by NID number
router.get('/find/:nidNumber', (req, res) => {
  try {
    const nids = loadNIDData();
    const nidNumber = req.params.nidNumber;
    const foundNid = nids.find((n: any) => n.nid === nidNumber);
    
    if (!foundNid) {
      return res.status(404).json({
        success: false,
        error: 'NID not found'
      });
    }
    
    res.json({
      success: true,
      data: foundNid
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch NID data'
    });
  }
});

// Search NIDs by name
router.get('/search/name/:name', (req, res) => {
  try {
    const nids = loadNIDData();
    const searchName = req.params.name.toLowerCase();
    const filteredNids = nids.filter((n: any) => 
      n.name.toLowerCase().includes(searchName)
    );
    
    res.json({
      success: true,
      count: filteredNids.length,
      data: filteredNids
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to search NID data'
    });
  }
});

// Get NIDs by district
router.get('/district/:district', (req, res) => {
  try {
    const nids = loadNIDData();
    const district = req.params.district.toLowerCase();
    const filteredNids = nids.filter((n: any) => 
      n.address.district.toLowerCase() === district
    );
    
    res.json({
      success: true,
      count: filteredNids.length,
      data: filteredNids
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch NID data by district'
    });
  }
});

// Get NIDs by division
router.get('/division/:division', (req, res) => {
  try {
    const nids = loadNIDData();
    const division = req.params.division.toLowerCase();
    const filteredNids = nids.filter((n: any) => 
      n.address.division.toLowerCase() === division
    );
    
    res.json({
      success: true,
      count: filteredNids.length,
      data: filteredNids
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch NID data by division'
    });
  }
});

export default router; 