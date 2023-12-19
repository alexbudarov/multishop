import { Grid, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import {
  Button,
  CreateButton,
  DeleteButton,
  EditButton,
  ExportButton,
  FilterButton,
  FilterForm,
  ListContextProvider,
  Pagination,
  ShowButton,
  SimpleList,
  SortButton,
  TextInput,
  TopToolbar,
  useList,
  UseListValue
} from "react-admin";

export const SimpleCardListTemplate = () => {
  /*vtl
  #if (!$card.itemsVariableName)
  const [data, setData] = useState<${card.itemType}[]>([]);
  #end
  */
  /*vtl #if (false)*/ useState(); /*vtl #end */

  const listContext: UseListValue /*vtl<${card.itemType}>*/ = useList({
    /*vtl data: #if ($card.itemsVariableName) ${card.itemsVariableName} #else data #end as Array<${card.itemType}>, */
    /*vtl #if($card.rowsPerPage) perPage: $card.rowsPerPage #end */
  });

  /*vtl #if($card.filterProperties.size() > 0)  */
  useEffect(() => {
    //TODO apply filter to data / dataSource
    console.log(listContext.filterValues);
  }, [listContext.filterValues]);
  /*vtl #end */

  /*vtl #if($card.sortProperties.size() > 0)  */
  useEffect(() => {
    //TODO apply sort payload to data / dataSource
    console.log(listContext.sort);
  }, [listContext.sort]);
  /*vtl #end */

  /*vtl #if ($card.pagination) */
  useEffect(() => {
    //TODO apply paging to data / dataSource
    console.log(listContext.page, listContext.perPage);
  }, [listContext.page, listContext.perPage]);
  /*vtl #end */

  /*vtl
  #if ($card.actions.size() > 0)
    #set($toolbarActionPresent = false)
    #foreach($action in $card.actions)
      #if ($action.id == "create" || $action.id == "export")
        #set($toolbarActionPresent = true)
        #break
      #end
    #end
  #end
  */

  return (
    <ListContextProvider value={listContext}>
      {/*vtl #if ($card.filterProperties.size() > 0 || $card.sortProperties.size() > 0 || $toolbarActionPresent ) */}
      <TopToolbar>
        {/*vtl #if ($card.filterProperties.size() > 0)*/}
        <FilterForm /*vtl filters={[
          #foreach($property in $card.filterProperties)
            <TextInput source="${property.name}" name="${property.name}" />,
          #end
        ]}*/
        />
        {/*vtl #end */}
        <Stack direction="row">
          {/*vtl #if ($card.sortProperties.size() > 0)*/}
          <SortButton
            fields={
              [
                /*vtl #foreach($property in $card.sortProperties) $sQuote$property.name$sQuote, #end */
              ]
            }
          />
          {/*vtl #end */}
          {/*vtl #if ($card.filterProperties.size() > 0)*/}
          <FilterButton /*vtl filters={[
            #foreach($property in $card.filterProperties)
              <TextInput source="${property.name}" name="${property.name}" />,
            #end
          ]}*/
          />
          {/*vtl #end */}
          {/*vtl #foreach($action in $card.actions) */}
          {/*vtl #if($action.type == 'create') */}
          <CreateButton /*vtl label="$action.label"*/ />
          {/*vtl #elseif($action.type == 'export') */}
          <ExportButton /*vtl label="$action.label"*/ />
          {/*vtl #end */}
          {/*vtl #end */}
        </Stack>
      </TopToolbar>
      {/*vtl #end */}
      <SimpleList /*vtl<${card.itemType}>*/
        /*vtl primaryText={record => record.${card.titleProperty.name} } */
        /*vtl
            #if ($card.itemProperties.size() > 0)
            #set ($gridItemSize = 12 / $card.itemProperties.size())
            secondaryText={record =>
            <Grid container spacing={2}>
            #foreach($property in $card.itemProperties)
            #if (!$property.asTitle)
            <Grid item md={$gridItemSize} sm={6} xs={12}>
              <Typography variant="body2">{record.${property.name}}</Typography>
            </Grid>
            #end
            #end
            </Grid>}
            #end
          */
        tertiaryText={(record) => (
          <div>
            {/*vtl #foreach($action in $card.actions)
             #if($action.type == 'edit')
             <EditButton label="$action.label" record={record} onClick={() => {alert('TODO: specify resource or implement custom edit logic')}}/>
             #elseif($action.type == 'show')
             <ShowButton label="$action.label" record={record} onClick={() => {alert('TODO: specify resource or implement custom show logic')}}/>
             #elseif ($action.type == 'delete')
             <DeleteButton label="$action.label" record={item} onClick={() => {alert('TODO: specify resource or implement custom deletion logic')}}/>
             #elseif ($action.type == 'custom')
             <Button label="$action.label" onClick={() => {alert('TODO: implement custom action logic')}}/>
             #end
            #end*/}
          </div>
        )}
        linkType={false}
        rowStyle={(_, index) => ({ borderTop: index !== 0 ?  "1px solid #EFEFEF" : "inherit"})}
      />
      {/*vtl #if ($card.pagination) */}
      <Pagination /*vtl #if($card.rowsPerPage) rowsPerPageOptions={[$card.rowsPerPage]} #end */ />
      {/*vtl #end */}
      {/*vtl #if (false) */}
      <TextInput source="undefined" />
      <Typography />
      <EditButton />
      <ShowButton />
      <DeleteButton />
      <Button />
      <Grid/>
      {/*vtl #end */}
    </ListContextProvider>
  );
};
