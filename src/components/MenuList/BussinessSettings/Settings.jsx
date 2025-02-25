import { useState, useEffect } from "react";
import { Container, TextField, MenuItem, Button, Box, Card, CardContent, Typography } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const languages = {
  English: { title: "Business Settings", tenantSettings: "Tenant Settings", businessName: "Business Name", language: "Language", businessDetails: "Business Details", timezone: "Timezone", currency: "Currency", branding: "Branding", uploadLogo: "Upload Logo", themeColor: "Theme Color" },
  Spanish: { title: "Configuración de negocio", tenantSettings: "Configuración del inquilino", businessName: "Nombre del negocio", language: "Idioma", businessDetails: "Detalles del negocio", timezone: "Zona horaria", currency: "Moneda", branding: "Marca", uploadLogo: "Subir logotipo", themeColor: "Color del tema" },
  French: { title: "Paramètres de l'entreprise", tenantSettings: "Paramètres du locataire", businessName: "Nom de l'entreprise", language: "Langue", businessDetails: "Détails de l'entreprise", timezone: "Fuseau horaire", currency: "Devise", branding: "Image de marque", uploadLogo: "Télécharger le logo", themeColor: "Couleur du thème" }
};

const timezones = ["GMT", "UTC", "PST", "EST", "CST"];
const currencies = ["USD", "EUR", "GBP", "INR"];

const BusinessSettings = () => {
  const [formData, setFormData] = useState({
    businessName: "",
    language: "English",
    timezone: "",
    currency: "",
    logo: null,
    logoPreview: null,
    themeColor: "#ffffff" // Default white background
  });

  // Effect to change background color dynamically
  useEffect(() => {
    document.body.style.backgroundColor = formData.themeColor;
    return () => {
      document.body.style.backgroundColor = ""; // Reset on unmount
    };
  }, [formData.themeColor]);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setFormData({
          ...formData,
          logo: file,
          logoPreview: reader.result,
        });
      };
    }
  };

  const text = languages[formData.language];

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        transition: "background-color 0.3s ease-in-out"
      }}
    >
      <Box display="flex" flexDirection="column" alignItems="center" gap={4}>
        <Typography variant="h4" fontWeight="bold" textAlign="center" mt={3}>
          {text.title}
        </Typography>

        {/* Tenant Settings */}
        <Card sx={{ width: { xs: "100%", md: "90%", lg: "165%" }, maxWidth: "900px", padding: 3 ,boxShadow: 4, borderRadius: 2, backgroundColor: "#f9f9f9"}}>
          <CardContent>
            <Typography variant="h6" gutterBottom>{text.tenantSettings}</Typography>
            <TextField fullWidth label={text.businessName} name="businessName" value={formData.businessName} placeholder={text.businessName} onChange={handleChange} margin="normal" />
            <TextField fullWidth select label={text.language} name="language" value={formData.language} onChange={handleChange} margin="normal">
              {Object.keys(languages).map((lang) => (
                <MenuItem key={lang} value={lang}>{lang}</MenuItem>
              ))}
            </TextField>
          </CardContent>
        </Card>

        {/* Business Details */}
        <Card sx={{ width: { xs: "100%", md: "90%", lg: "165%" }, maxWidth: "900px", padding: 3 ,boxShadow: 4, borderRadius: 2, backgroundColor: "#f9f9f9"}}>
          <CardContent>
            <Typography variant="h6" gutterBottom>{text.businessDetails}</Typography>
            <TextField fullWidth select label={text.timezone} name="timezone" value={formData.timezone} onChange={handleChange} margin="normal">
              {timezones.map((tz) => (
                <MenuItem key={tz} value={tz}>{tz}</MenuItem>
              ))}
            </TextField>
            <TextField fullWidth select label={text.currency} name="currency" value={formData.currency} onChange={handleChange} margin="normal">
              {currencies.map((curr) => (
                <MenuItem key={curr} value={curr}>{curr}</MenuItem>
              ))}
            </TextField>
          </CardContent>
        </Card>

        {/* Branding */}
        <Card sx={{ width: { xs: "100%", md: "90%", lg: "165%" }, maxWidth: "900px", padding: 3 ,boxShadow: 4, borderRadius: 2, backgroundColor: "#f9f9f9"}}>
          <CardContent>
            <Typography variant="h6" gutterBottom>{text.branding}</Typography>

            {/* Upload & Image Side by Side */}
            <Box display="flex" alignItems="center" gap={3} mt={2}>
              <Button variant="contained" component="label" startIcon={<CloudUploadIcon />} sx={{ fontSize: "1.2rem", padding: 1.5 }}>
                {text.uploadLogo}
                <input type="file" hidden onChange={handleFileUpload} />
              </Button>

              {/* Show Image Preview if Logo is Uploaded */}
              {formData.logoPreview && (
                <Box>
                  <img src={formData.logoPreview} alt="Uploaded Logo" style={{ maxWidth: "100px", maxHeight: "100px", borderRadius: "8px", objectFit: "contain", border: "1px solid #ddd" }} />
                </Box>
              )}
            </Box>

            {/* Theme Color Picker with Styled Box */}
            <Box mt={3}>
              <Typography variant="subtitle1" gutterBottom>{text.themeColor}</Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  border: "1px solid #ccc",
                  borderRadius: 2,
                  padding: "10px",
                  backgroundColor: "#fff",
                  cursor: "pointer",
                  width: "fit-content",
                  position: "relative"
                }}
              >
                {/* Color Preview Box */}
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: 1,
                    backgroundColor: formData.themeColor,
                    border: "1px solid #aaa"
                  }}
                />
                {/* Hidden Color Input Overlapping the Box */}
                <input
                  type="color"
                  name="themeColor"
                  value={formData.themeColor}
                  onChange={handleChange}
                  style={{
                    position: "absolute",
                    left: 0,
                    width: "40px",
                    height: "40px",
                    opacity: 0,
                    cursor: "pointer"
                  }}
                />
                <Typography>{formData.themeColor}</Typography>
              </Box>
            </Box>

          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default BusinessSettings;