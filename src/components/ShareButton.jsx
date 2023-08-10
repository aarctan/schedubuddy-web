import { Button } from "@mui/material";

export const ShareButton = (props) => {
  const copyShareLink = async () => {
    navigator.clipboard
      .writeText(props.shareLink)
      .then(() => {
        console.log("Link copied to clipboard");
        //TODO Add popup instead
      })
      .catch((err) => {
        console.error("Failed to copy link: ", err);
      });
  };

  return props.shareLink && (
    <Button
      onClick={copyShareLink}
      color="secondary"
      sx={{ mt: 1, ml: 2 }}
      type="submit"
      variant="contained"
    >
      Save Filters
    </Button>
  );
};
