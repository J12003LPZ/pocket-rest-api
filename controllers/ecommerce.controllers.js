import { pool } from "../db.js";

// Get all products
export const getProducts = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM product");
    if (rows.length === 0)
      return res.status(404).json({
        message: "Products not found",
      });

    res.json(rows);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Something goes wrong!",
    });
  }
};

// Get one product by id
export const getProduct = async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM product WHERE product_id = ?",
      [req.params.id]
    );

    if (rows.length <= 0)
      return res.status(404).json({
        message: `There is not product with id ${req.params.id}`,
      });

    res.json(rows);
  } catch (error) {
    return res.status(500).json({
      message: "Something goes wrong!",
    });
  }
};

export const getProductsByCategory = async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM product WHERE product_category = ?",
      [req.params.id]
    );

    if (rows.length <= 0)
      return res.status(404).json({
        message: `There is not product with the category of ${req.params.id}`,
      });

    res.json(rows);
  } catch (error) {
    return res.status(500).json({
      message: "Something goes wrong!",
    });
  }
};

// Get all men products
export const getAllMenProducts = async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM product WHERE product_category = 'men'"
    );
    res.json(rows);
  } catch (error) {
    return res.status(500).json({
      message: "Something goes wrong!",
    });
  }
};

// Get all womens products
export const getAllWomenProducts = async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM product WHERE product_category = 'women'"
    );
    res.json(rows);
  } catch (error) {
    return res.status(500).json({
      message: "Something goes wrong!",
    });
  }
};

// Get all kids products
export const getAllKidsProducts = async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM product WHERE product_category = 'kids'"
    );
    res.json(rows);
  } catch (error) {
    return res.status(500).json({
      message: "Something goes wrong!",
    });
  }
};

// Get all girls products
export const getAllGirlsProducts = async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM product WHERE product_category = 'girls'"
    );
    res.json(rows);
  } catch (error) {
    return res.status(500).json({
      message: "Something goes wrong!",
    });
  }
};

// Get latest products
export const getLatestProducts = async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM product ORDER BY created_at DESC LIMIT 4"
    );

    if (rows.length === 0) {
      return res.status(404).json({
        message: "Products not found",
      });
    }

    res.json(rows);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something goes wrong!",
    });
  }
};

// Get all auctions
export const getAuctions = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM auction");
    // Use destructuring assignment to get the first element(rows) of the result array returned by the pool.query function.
    if (rows.length === 0)
      return res.status(404).json({
        message: "Auctions not found",
      });

    res.json(rows); // respond with the list of auctions as JSON
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Something goes wrong!",
    });
  }
};

// Get one product by id
export const getAunction = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM auction WHERE id = ?", [
      req.params.id,
    ]);

    if (rows.length <= 0)
      return res.status(404).json({
        message: `There is not product with id ${req.params.id}`,
      });

    res.json(rows);
  } catch (error) {
    return res.status(500).json({
      message: "Something goes wrong!",
    });
  }
};

// Delete one auction by id
export const deleteAuction = async (req, res) => {
  const auctionId = req.params.id;

  try {
    const [result] = await pool.query("DELETE FROM auction WHERE id = ?", [
      auctionId,
    ]);

    if (result.affectedRows !== 1) {
      return res.status(500).json({ message: "Failed to delete auction" });
    }

    res.status(200).json({ message: "Auction deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

// Update one auction by id
export const updateAuction = async (req, res) => {
  const auctionId = req.params.id;

  try {
    const [existingAuction] = await pool.query(
      "SELECT * FROM auction WHERE id = ?",
      [auctionId]
    );

    if (!existingAuction.length) {
      return res.status(404).json({ message: "Auction not found" });
    }

    const {
      title,
      description,
      current_price,
      current_bidder,
      end_time,
      image_url,
      status,
    } = req.body;

    const [result] = await pool.query(
      "UPDATE auction SET title = ?, description = ?, current_price = ?, current_bidder = ?, end_time = IFNULL(STR_TO_DATE(?, '%Y-%m-%dT%H:%i:%sZ'), end_time), image_url = ?, status = ? WHERE id = ?",
      [
        title || existingAuction[0].title,
        description || existingAuction[0].description,
        current_price || existingAuction[0].current_price,
        current_bidder || existingAuction[0].current_bidder,
        end_time,
        image_url || existingAuction[0].image_url,
        status || existingAuction[0].status,
        auctionId,
      ]
    );

    if (result.affectedRows !== 1) {
      return res.status(500).json({ message: "Failed to update auction" });
    }

    const [updatedAuction] = await pool.query(
      "SELECT * FROM auction WHERE id = ?",
      [auctionId]
    );

    res.status(200).json(updatedAuction);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

// Create one auction
export const createAuction = async (req, res) => {
  const { title, description, start_price, end_time, seller, image_url } =
    req.body;

  if (!seller) {
    return res.status(400).json({ message: "Seller is required" });
  }

  const current_price = req.body.current_price || start_price;
  const current_bidder = req.body.current_bidder || null; // set current_bidder to NULL if no value is provided

  try {
    const [result] = await pool.query(
      "INSERT INTO auction (title, description, start_price, current_price, current_bidder, start_time, end_time, seller, status, image_url) VALUES (?, ?, ?, ?, ?, NOW(), STR_TO_DATE(?, '%Y-%m-%dT%H:%i:%sZ'), ?, 'active', ?)",
      [
        title,
        description,
        start_price,
        current_price,
        current_bidder,
        end_time,
        seller,
        image_url,
      ]
    );

    if (result.affectedRows !== 1) {
      return res.status(500).json({ message: "Failed to create auction" });
    }

    const newAuctionId = result.insertId;

    const [newAuction] = await pool.query(
      "SELECT * FROM auction WHERE id = ?",
      [newAuctionId]
    );

    res.status(201).json(newAuction);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};
