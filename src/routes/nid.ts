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
  /*  #swagger.tags = ['NID']
      #swagger.description = 'Retrieve all National ID records'
      #swagger.responses[200] = {
        description: 'Successfully retrieved all NID records',
        schema: {
          success: true,
          count: 150,
          data: [
            {
              id: 1,
              nid: "1234567890123",
              name: "John Doe",
              father_name: "Father Name",
              mother_name: "Mother Name", 
              date_of_birth: "01/01/1990",
              address: "123 Main St, City, Country"
            }
          ]
        }
      }
      #swagger.responses[500] = {
        description: 'Internal server error',
        schema: {
          success: false,
          error: 'Failed to fetch NID data'
        }
      }
  */
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
router.get('/id/:id', (req, res): any => {
  /*  #swagger.tags = ['NID']
      #swagger.description = 'Retrieve a specific National ID record by internal ID'
      #swagger.parameters['id'] = {
        in: 'path',
        description: 'Internal ID of the NID record',
        required: true,
        type: 'integer'
      }
      #swagger.responses[200] = {
        description: 'Successfully retrieved NID record',
        schema: {
          success: true,
          data: {
            id: 1,
            nid: "1234567890123",
            name: "John Doe",
            father_name: "Father Name",
            mother_name: "Mother Name",
            date_of_birth: "01/01/1990",
            address: "123 Main St, City, Country"
          }
        }
      }
      #swagger.responses[404] = {
        description: 'NID record not found',
        schema: {
          success: false,
          error: 'NID not found'
        }
      }
      #swagger.responses[500] = {
        description: 'Internal server error',
        schema: {
          success: false,
          error: 'Failed to fetch NID data'
        }
      }
  */
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
router.post('/find', (req, res): any => {
  /*  #swagger.tags = ['NID']
      #swagger.description = 'Find a National ID record by NID number and date of birth'
      #swagger.requestBody = {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["nidnumber", "dob"],
              properties: {
                nidnumber: {
                  type: "string",
                  description: "National ID number",
                  example: "1234567890123"
                },
                dob: {
                  type: "string",
                  description: "Date of birth",
                  example: "01/01/1990"
                }
              }
            }
          }
        }
      }
      #swagger.responses[200] = {
        description: 'Successfully found NID record',
        schema: {
          success: true,
          data: {
            id: 1,
            nid: "1234567890123",
            name: "John Doe",
            father_name: "Father Name",
            mother_name: "Mother Name",
            date_of_birth: "01/01/1990",
            address: "123 Main St, City, Country"
          }
        }
      }
      #swagger.responses[400] = {
        description: 'Missing required parameters',
        schema: {
          success: false,
          error: 'Missing required query parameters: nidnumber and dob'
        }
      }
      #swagger.responses[404] = {
        description: 'NID record not found',
        schema: {
          success: false,
          error: 'NID not found'
        }
      }
      #swagger.responses[500] = {
        description: 'Internal server error',
        schema: {
          success: false,
          error: 'Failed to fetch NID data'
        }
      }
  */
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
router.get('/find/:nidNumber', (req, res): any => {
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