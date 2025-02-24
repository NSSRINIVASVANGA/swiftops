import { useState } from "react";
import { Container, TextField, MenuItem, Button, Box, Card, CardContent, Typography } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const languages = {
  English: { title: "Business Settings", tenantSettings: "Tenant Settings", businessName: "Business Name", language: "Language", businessDetails: "Business Details", timezone: "Timezone", currency: "Currency", branding: "Branding", uploadLogo: "Upload Logo" },
  Spanish: { title: "Configuración de negocio", tenantSettings: "Configuración del inquilino", businessName: "Nombre del negocio", language: "Idioma", businessDetails: "Detalles del negocio", timezone: "Zona horaria", currency: "Moneda", branding: "Marca", uploadLogo: "Subir logotipo" },
  French: { title: "Paramètres de l'entreprise", tenantSettings: "Paramètres du locataire", businessName: "Nom de l'entreprise", language: "Langue", businessDetails: "Détails de l'entreprise", timezone: "Fuseau horaire", currency: "Devise", branding: "Image de marque", uploadLogo: "Télécharger le logo" }
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
    logoPreview: null, // Stores the Base64 preview
  });

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file); // Convert file to Base64
      reader.onloadend = () => {
        setFormData({
          ...formData,
          logo: file,
          logoPreview: reader.result, // Store Base64 data
        });
      };
    }
  };

  const text = languages[formData.language];

  return (
    <Container sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100vh" }}>
      <Box display="flex" flexDirection="column" alignItems="center" gap={4}>
        <Typography variant="h4" fontWeight="bold" textAlign="center" mt={3}>{text.title}</Typography>
        
        {/* Tenant Settings */}
        <Card sx={{ width: { xs: "100%", md: "90%", lg: "85%" }, maxWidth: "900px", padding: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>{text.tenantSettings}</Typography>
            <TextField fullWidth label={text.businessName} name="businessName" value={formData.businessName} placeholder={text.businessName} onChange={handleChange} margin="normal" sx={{ fontSize: "1.2rem", padding: 0 }} />
            <TextField fullWidth select label={text.language} name="language" value={formData.language} onChange={handleChange} margin="normal" sx={{ fontSize: "1.2rem", padding: 1 }}>
              {Object.keys(languages).map((lang) => (
                <MenuItem key={lang} value={lang}>{lang}</MenuItem>
              ))}
            </TextField>
          </CardContent>
        </Card>

        {/* Business Details */}
        <Card sx={{ width: { xs: "100%", md: "90%", lg: "85%" }, maxWidth: "900px", padding: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>{text.businessDetails}</Typography>
            <TextField fullWidth select label={text.timezone} name="timezone" value={formData.timezone} onChange={handleChange} margin="normal" sx={{ fontSize: "1.2rem", padding: 0 }}>
              {timezones.map((tz) => (
                <MenuItem key={tz} value={tz}>{tz}</MenuItem>
              ))}
            </TextField>
            <TextField fullWidth select label={text.currency} name="currency" value={formData.currency} onChange={handleChange} margin="normal" sx={{ fontSize: "1.2rem", padding: 0 }}>
              {currencies.map((curr) => (
                <MenuItem key={curr} value={curr}>{curr}</MenuItem>
              ))}
            </TextField>
          </CardContent>
        </Card>

        {/* Branding */}
        <Card sx={{ width: { xs: "100%", md: "90%", lg: "85%" }, maxWidth: "900px", padding: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>{text.branding}</Typography>
            
            {/* Upload & Image Side by Side */}
            <Box display="flex" alignItems="center" gap={3} mt={2}>
              {/* Upload Button */}
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

          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default BusinessSettings;