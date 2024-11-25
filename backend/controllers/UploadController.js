const ImgUpload = async (req, res) => {
  try {
    const serverUrl = `${req.protocol}://${req.get("host")}`; // Get the server's base URL
    const imagePath = `${serverUrl}/${req.file.path.replace(/\\/g, "/")}`; // Construct the full image URL

    return res.status(200).json({
      success: true,
      message: "Image uploaded successfully!",
      imagePath: imagePath,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Error uploading image", error: error.message });
  }
};

module.exports = { ImgUpload };
