import React from "react";
import TabPanel from "./TabPanel";
import { UpdateByField, Value } from "../../utils/types";
import EditorField from "../../shared/EditorField";
import { useAppSelector } from "../../../../app/store/hooks";
import { updateInformation } from "../../../../app/store/slices/profileSlice";
import { useDispatch } from "react-redux";

const BioTab: React.FC<Value> = ({
    value
}) => {

    const dispatch = useDispatch()

    const { bio } = useAppSelector(state => state.profile)
    const { basic_information } = useAppSelector(state => state.profile)

    const handleSubmit = (editor: string) => {
        const data: UpdateByField = {
            user_id: basic_information!.employee_id,
            field: 'bio',
            value: editor
        }
        dispatch(updateInformation(data))
    }

    return (
        <TabPanel value={2} index={value}>
            <EditorField
                value={bio}
                onSubmit={handleSubmit}
            />
        </TabPanel>
    )
}

export default BioTab