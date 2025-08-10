import React from "react";
import TabPanel from "./TabPanel";
import { Value } from "../../utils/types";
import EditorField from "../../shared/EditorField";

const BioTab: React.FC<Value> = ({
    value
}) => {


    return (
        <TabPanel value={2} index={value}>
            <EditorField
            />
        </TabPanel>
    )
}

export default BioTab