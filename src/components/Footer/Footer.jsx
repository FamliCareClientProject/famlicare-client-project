import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';

// Footer component definition
// This component uses Material-UI components to render the footer section of the application.
function Footer() {
  // Accessing the theme context provided by MUI for potential theme-based styling.
  // If you need to adjust the footer styling based on the theme, you can use the theme variable.
  const theme = useTheme(); 

  // The footer is wrapped in a Box component for easy styling.
  // The Box component's 'sx' prop is used for inline styling.
  // To change the footer's appearance (e.g., color, padding), modify the sx prop values.
  return (
    <Box component="footer" sx={{ py: 2, textAlign: 'center', borderTop: 1, borderColor: 'divider' }}>
      {/* Typography component is used for text rendering. */}
      {/* To change the copyright notice, edit the content within Typography. */}
      {/* For font styling adjustments, modify the variant prop or add styles to the sx prop. */}
      <Typography variant="body2">
        &copy; Famlicare 2024
      </Typography>
    </Box>
  );
}

export default Footer;