import AppHeader from "@saleor/components/AppHeader";
import Container from "@saleor/components/Container";
import Grid from "@saleor/components/Grid";
import PageHeader from "@saleor/components/PageHeader";
import { OrderErrorFragment } from "@saleor/fragments/types/OrderErrorFragment";
import { SubmitPromise } from "@saleor/hooks/useForm";
import { FormsetChange } from "@saleor/hooks/useFormset";
import { OrderDetails_order } from "@saleor/orders/types/OrderDetails";
import React from "react";
import { defineMessages, useIntl } from "react-intl";

import OrderRefundAmount from "../OrderRefundAmount";
import OrderRefundForm, { OrderRefundSubmitData } from "./form";
import UnfulfiledItemsCard from "./UnfulfiledItemsCard";

const messages = defineMessages({
  appTitle: {
    defaultMessage: "Order #{orderNumber}",
    description: "page header with order number"
  },
  pageTitle: {
    defaultMessage: "Order no. {orderNumber} - Replace/Return",
    description: "page header"
  }
});

export interface OrderReturnPageProps {
  order: OrderDetails_order;
  disabled: boolean;
  errors: OrderErrorFragment[];
  onBack: () => void;
  onSubmit: (data: OrderRefundSubmitData) => SubmitPromise;
}

const OrderRefundPage: React.FC<OrderReturnPageProps> = props => {
  const { order, disabled, errors = [], onBack, onSubmit } = props;

  const intl = useIntl();

  const handleQuantityChange = (
    callback: (id: string, value: number) => FormsetChange<number>
  ) => (id: string, value: string) => callback(id, parseInt(value, 10));

  return (
    <OrderRefundForm order={order} onSubmit={onSubmit}>
      {({ data, handlers, change, submit }) => (
        <Container>
          <AppHeader onBack={onBack}>
            {intl.formatMessage(messages.appTitle, {
              orderNumber: order?.number
            })}
          </AppHeader>
          <PageHeader
            title={intl.formatMessage(messages.pageTitle, {
              orderNumber: order?.number
            })}
          />
          <Grid>
            <>
              lol
              <UnfulfiledItemsCard
                order={order}
                data={data}
                onChangeQuantity={handleQuantityChange(
                  handlers.changeUnfulfiledItemsQuantity
                )}
                onSetMaxQuantity={
                  handlers.handleSetMaximalUnfulfiledItemsQuantities
                }
                onChangeSelected={handlers.changeItemsToBeReplaced}
              />
              {/* {renderCollection(
                    getFulfilledFulfillemnts(order),
                    fulfillment => (
                      <React.Fragment key={fulfillment?.id}>
                        <CardSpacer />
                        <OrderRefundFulfilledProducts
                          fulfillment={fulfillment}
                          data={data}
                          disabled={disabled}
                          orderNumber={order?.number}
                          onRefundedProductQuantityChange={
                            handlers.changeRefundedFulfilledProductQuantity
                          }
                          onSetMaximalQuantities={() =>
                            handlers.setMaximalRefundedFulfilledProductQuantities(
                              fulfillment?.id
                            )
                          }
                        />
                      </React.Fragment>
                    )
                  )} */}
            </>
            <OrderRefundAmount
              data={data}
              order={order}
              disabled={disabled}
              errors={errors}
              onChange={change}
              onRefund={submit}
            />
          </Grid>
        </Container>
      )}
    </OrderRefundForm>
  );
};
OrderRefundPage.displayName = "OrderRefundPage";
export default OrderRefundPage;