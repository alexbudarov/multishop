import { ComponentPreview, Previews } from "@amplicode/ide-toolbox";
import { PaletteTree } from "./palette";

const ComponentPreviews = () => {
  return (
    <Previews palette={<PaletteTree />}>
      <ComponentPreview path="/AmplicodeTest">
        <div>AmplicodeTest</div>
      </ComponentPreview>
    </Previews>
  );
};

export default ComponentPreviews;
