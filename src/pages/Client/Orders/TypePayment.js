import React from "react";
import { Button, Icon } from "semantic-ui-react";

export const TypePayment = ({ onCreatePayment }) => {
  return (
    <Button.Group fluid size="huge">
      <Button negative onClick={() => onCreatePayment("CARD")}>
        Pagar con tarjeta
      </Button>
      <Button.Or text="O" />
      <Button positive onClick={() => onCreatePayment("CASH")}>
        Pagar con efectivo
      </Button>
    </Button.Group>
  );
};
