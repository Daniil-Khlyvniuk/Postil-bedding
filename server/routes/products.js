const express = require("express");
const router = express.Router();
const passport = require("passport");

//Import controllers
const {
	addProduct,
	updateProduct,
	getProducts,
	getProductsInfo,
	getFilteredVariants,
	getProductsFilterParams,
	searchAutocomplete,
	getVariantById,
	searchProducts
} = require("../controllers/products");


// @route   POST /products/images
// @desc    Add images
// @access  Private

router.post(
	"/",
	// passport.authenticate("jwt-admin", { session: false }),
	addProduct
);

// @route   PUT /products/:id
// @desc    Update existing product
// @access  Private
router.put(
	"/:id",
	passport.authenticate("jwt-admin", { session: false }),
	updateProduct
);

// @route   GET /products
// @desc    GET existing products
// @access  Public
router.get("/", getProducts);

router.get("/:varId", getVariantById);
router.get("/info/:kindOfInfo/:productId", getProductsInfo);
router.get("/variant/:filterParam/:filterParamId/:productId", getFilteredVariants);

// @route   GET /products/filter
// @desc    GET appropriate filtered products
// @access  Public
router.get("/filter", getProductsFilterParams);

// @route   POST /products/search
// @desc    POST appropriate to search query products
// @access  Public
router.post("/autocomplete", searchAutocomplete);
router.post("/search", searchProducts);

// @route   GET /products/:id
// @desc    GET existing product by id
// @access  Public
// router.get("/:itemNo", getProductById/\);

module.exports = router;
