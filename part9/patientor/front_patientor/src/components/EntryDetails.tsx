
import React from "react";
import { Entry } from "../types";
import Hospital from "./Hospital";
import HealthCheck from "./HealthCheck";
import  OccupationalHealthcare  from "./OccupationalHealthcare";
/**
 * Helper function for exhaustive type checking
 */
 const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

const EntryDetatils: React.FC<{entry: Entry}> = ({entry}) => {
    switch (entry.type) {
        case "Hospital":
            return <Hospital entry={entry}/>;
        case "HealthCheck":
            return <HealthCheck entry={entry}/>;
        case "OccupationalHealthcare":
            return <OccupationalHealthcare entry={entry}/>;
        default:
            return assertNever(entry);
    }
};

export default EntryDetatils;