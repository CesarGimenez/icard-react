import React, { useEffect, useState } from "react";
import { Button, Checkbox, Icon } from "semantic-ui-react";
import { map } from "lodash";
import { TableAdmin } from "./TableAdmin";
import { useAuth } from "../../hooks/useAuth";
import "./TableListAdmin.scss";

export const TableLisAdmin = ({ tables }) => {
  const [reload, setReload] = useState(false);
  const [autoReload, setAutoReload] = useState(false);
  const { auth } = useAuth();
  const onReload = () => {
    setReload((prev) => !prev);
  };

  useEffect(() => {
    if (autoReload) {
      const autoReloadAction = () => {
        onReload();
        setTimeout(() => {
          autoReloadAction();
        }, 5000);
      };
      autoReloadAction();
    }
  }, [autoReload]);

  const onCheckAutoReload = (check) => {
    if (check) {
      setAutoReload(check);
    } else {
      setAutoReload(false);
    }
  };
  return (
    <div className="table-list-admin">
      <Button
        primary
        icon
        className="table-list-admin__reload"
        onClick={() => onReload()}
      >
        <Icon name="refresh" />
      </Button>
      {auth.me.is_staff && (
        <div className="table-list-admin__reload-toggle">
          <span>Actualizar en tiempo real </span>
          <Checkbox
            toggle
            onChange={(_, data) => onCheckAutoReload(data.checked)}
          />
        </div>
      )}
      {map(tables, (table) => (
        <TableAdmin key={table.number} table={table} reload={reload} />
      ))}
    </div>
  );
};
