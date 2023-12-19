import {
  Button,
  CreateButton,
  Datagrid, DeleteButton, EditButton, ExportButton, FilterButton,
  FilterForm,
  ListContextProvider, Pagination, ShowButton, SimpleShowLayout, SortButton,
  TextField, TextInput, TopToolbar,
  useList,
  UseListOptions,
  UseListValue
} from "react-admin";
import { Paper, Stack } from "@mui/material";
import { useEffect, useState } from "react";

export const DataGridTableTemplate = () => {

  /*vtl
  #if (!$table.itemsVariableName)
  const [data, setData] = useState<${table.itemType}[]>([]);
  #end
  */
  /*vtl #if (false)*/ useState() /*vtl #end */

  const listContext: UseListValue/*vtl<${table.itemType}>*/ = useList({
    /*vtl data: #if ($table.itemsVariableName) ${table.itemsVariableName} #else data #end as Array<${table.itemType}>, */
    /*vtl #if($table.rowsPerPage) perPage: $table.rowsPerPage #end */
  });

  /*vtl #if($table.filterProperties.size() > 0)  */
  useEffect(() => {
    //TODO apply filter to data / dataSource
    console.log(listContext.filterValues)
  }, [listContext.filterValues]);
  /*vtl #end */

  /*vtl #if($table.sortProperties.size() > 0)  */
  useEffect(() => {
    //TODO apply sort payload to data / dataSource
    console.log(listContext.sort)
  }, [listContext.sort]);
  /*vtl #end */

  return (
    <ListContextProvider value={listContext}>
      {/*vtl #if ($table.filterProperties.size() > 0 || $table.actions.size()>0 ) */}
      <TopToolbar>
        {/*vtl #if ($table.filterProperties.size() > 0)*/}
        <FilterForm /*vtl filters={[
          #foreach($property in $table.filterProperties)
            <TextInput source="${property.name}" name="${property.name}" />,
          #end
        ]}*//>
        {/*vtl #end */}
        <Stack direction="row">
          {/*vtl #if ($table.filterProperties.size() > 0)*/}
          <FilterButton /*vtl filters={[
            #foreach($property in $table.filterProperties)
              <TextInput source="${property.name}" name="${property.name}" />,
            #end
          ]}*//>
          {/*vtl #end */}
          {/*vtl #foreach($action in $table.actions) */}
          {/*vtl #if($action.type == 'create') */}
          <CreateButton /*vtl label="$action.label"*//>
          {/*vtl #elseif ($action.type == 'export') */}
          <ExportButton /*vtl label="$action.label"*//>
          {/*vtl #elseif ($action.type == 'custom') */}
          <Button /*vtl label="$action.label"*//>
          {/*vtl #end */}
          {/*vtl #end */}
        </Stack>
      </TopToolbar>
      {/*vtl #end */}
      <Paper /*vtl #if ($table.fixedColumn) sx={{
          maxWidth: "800px",
          margin: "0px auto"
        }} #end */ >
        <Datagrid /*vtl #if ($table.expandableRow) isRowExpandable={record => #foreach($expandIfProp in $table.expandIfSet) #if ($velocityCount > 1) && #end record.$expandIfProp.name != null #end }
          expand={record =><SimpleShowLayout>
          #foreach($expandProp in $table.displayInExpand)
          <TextField source="$expandProp.name"/>
          #end
          </SimpleShowLayout>
          }
          #end*/
          /*vtl
          #if ($table.stripes || $table.fixedColumn || $table.rowSize == 'large')
          sx={{
              #if ($table.stripes)
              '& .RaDatagrid-rowOdd': {
                  backgroundColor: '#EFEFEF',
              },
              #end
              #if ($table.fixedColumn)
              "& .RaDatagrid-tableWrapper": {
                overflowX: "scroll",
                position: "relative"
              },
              "& .column-$table.fixedColumn.name": {
              position: "sticky",
                left: 0,
                background: "white",
                boxShadow: "5px 2px 5px grey",
                borderRight: "1px solid #CCC",
                width: "200px"
              },
              #end
              #if ($table.rowSize == 'large')
              "& .RaDatagrid-rowCell": {
                paddingTop: "24px",
                paddingBottom: "24px",
              },
              #end
          }}
          #end
          */
          /*vtl
          #if ($table.fixedHeader)
          stickyHeader={true}
          #end
          */
          /*vtl
          #if ($table.rowSize == 'small' || $table.rowSize == 'medium')
          size="$table.rowSize"
          #end
          */>
          {/*vtl #if ($table.fixedColumn) */}
          <TextField /*vtl source="$table.fixedColumn.name" #if($table.fixedColumn.sorted) sortable #end*/ />
          {/*vtl #end */}
          {/*vtl #foreach($property in $table.itemProperties)*/}
          {/*vtl #if (!$property.fixedColumn) */}
          <TextField /*vtl source="${property.name}" #if($property.sorted) sortable #end*/ />
          {/*vtl #end*/}
          {/*vtl #end */}
          {/*vtl #foreach($action in $table.actions) */}
          {/*vtl #if ($action.type == 'edit') */}
          <EditButton /*vtl label="$action.label"*/ onClick={() => {alert('TODO: specify resource or implement custom edit logic')}}/>
          {/*vtl #elseif ($action.type == 'show') */}
          <ShowButton /*vtl label="$action.label"*/  onClick={() => {alert('TODO: specify resource or implement custom show logic')}}/>
          {/*vtl #elseif ($action.type == 'show') */}
          <DeleteButton /*vtl label="$action.label"*/  onClick={() => {alert('TODO: specify resource or implement custom delete logic')}}/>
          {/*vtl #elseif ($action.type == 'custom') */}
          <Button /*vtl label="$action.label"*/  onClick={() => {alert('TODO: implement custom action logic')}}/>
          {/*vtl #end */}
          {/*vtl #end */}
        </Datagrid>
      </Paper>
      {/*vtl #if (false) */}
      <TextInput source="undefined"/>
      <SimpleShowLayout>-</SimpleShowLayout>
      {/*vtl #end */}
    </ListContextProvider>
  );
};