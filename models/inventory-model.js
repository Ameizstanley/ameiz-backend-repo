// const pool = require("../database/")

// /* ***************************
//  *  Get all classification data
//  * ************************** */
// async function getClassifications(){
//   return await pool.query("SELECT * FROM public.classification ORDER BY classification_name")
// }


// /* ***************************
// * GET ALL inventory and clssification_name by classification_id
// * ************************** */
// async function getInventoryByClassificationId(classification_id) {
//     try {
//         const data = await pool.query(
//             `SELECT * FROM public.inventory AS i
//             JOIN public.classification AS c
//             ON i.classififcation_id = c.classification_id
//             WHERE i.classification_id = $1`
//             , [classification_id]
//         )
//         return data.rows
//     } catch (error) {
//         console.error('getclassificationbyid error' + error)
//     }
// }

// // get inventory item by inventory_id
// invModel.getInventoryByInventoryId = async function (inventory_id) {
//     try {
//         const data = await pool.query(
//             `SELECT * FROM public.inventory AS i
//             JOIN public.classification AS C
//             ON i.classification_id = c.classification_id 
//             WHERE i.inv_id = $1`,
//             [inventory_id]
//         )
//         return data.rows[0]
//     }catch (error) {
//         console.error("getInventoryByInventoryId error:")
//     }
// }


// module.exports = {getClassifications, getInventoryByClassificationId}


// models/inventory-model.js
const pool = require("../database/")

/* ***************************
 *  Get all classification data
 * ************************** */
async function getClassifications(){
  return await pool.query("SELECT * FROM public.classification ORDER BY classification_name")
}

/* ***************************
 *  Get all inventory items and classification_name by classification_id
 * ************************** */
async function getInventoryByClassificationId(classification_id) {
  try {
    const data = await pool.query(
      `SELECT * FROM public.inventory AS i 
      JOIN public.classification AS c 
      ON i.classification_id = c.classification_id 
      WHERE i.classification_id = $1`,
      [classification_id]
    )
    return data.rows || []
  } catch (error) {
    console.error("getInventoryByClassificationId error " + error)
    return []
  }
}

/* ***************************
 *  Get inventory item by inventory id
 * ************************** */
async function getInventoryByInvId(inv_id) {
  try {
    const data = await pool.query(
    ` SELECT * FROM public.inventory AS i
      JOIN public.classification AS C
      ON i.classification_id = c.classification_id
      WHERE i.inv_id = $1 `,
      [inv_id]
    )
    return data.rows[0] || null
  } catch (error) {
    console.error("getInventoryByInvId error " + error)
    return null
  }
}

module.exports = {
  getClassifications,
  getInventoryByClassificationId,
  getInventoryByInvId
}