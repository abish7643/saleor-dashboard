import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import CardTitle from "@saleor/components/CardTitle";
import { PageErrorFragment } from "@saleor/fragments/types/PageErrorFragment";
import { commonMessages } from "@saleor/intl";
import { getFormErrors } from "@saleor/utils/errors";
import getPageErrorMessage from "@saleor/utils/errors/page";
import React from "react";
import { useIntl } from "react-intl";

const useStyles = makeStyles(
  {
    root: {
      overflow: "visible"
    }
  },
  { name: "PageTypeDetails" }
);

interface PageTypeDetailsProps {
  data?: {
    name: string;
  };
  disabled: boolean;
  errors: PageErrorFragment[];
  onChange: (event: React.ChangeEvent<any>) => void;
}

const PageTypeDetails: React.FC<PageTypeDetailsProps> = props => {
  const { data, disabled, errors, onChange } = props;
  const intl = useIntl();
  const classes = useStyles(props);

  const formErrors = getFormErrors(["name"], errors);

  return (
    <Card className={classes.root}>
      <CardTitle
        title={intl.formatMessage(commonMessages.generalInformations)}
      />
      <CardContent>
        <TextField
          disabled={disabled}
          fullWidth
          error={!!formErrors.name}
          helperText={getPageErrorMessage(formErrors.name, intl)}
          label={intl.formatMessage({
            defaultMessage: "Content Type Name"
          })}
          name="name"
          onChange={onChange}
          value={data.name}
        />
      </CardContent>
    </Card>
  );
};
PageTypeDetails.displayName = "PageTypeDetails";
export default PageTypeDetails;
