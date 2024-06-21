import { join } from "node:path";
import { cwd } from "node:process";
import { Plugin } from "vite";
import type { MetaCheckerOptions } from "vue-component-meta";
import { createChecker } from "vue-component-meta";

export interface VueMetaPluginOptions {
  tsconfigPath?: string;
}

function vueMeta(options: VueMetaPluginOptions = {}): Plugin {
  const { tsconfigPath = join(cwd(), "tsconfig.json") } = options;

  const checkerOptions: MetaCheckerOptions = {
    forceUseTs: true,
    printer: { newLine: 1 },
  };

  const tsconfigChecker = createChecker(tsconfigPath, checkerOptions);

  return {
    name: "vue-meta",
    enforce: "pre",
    transform(code, id, options) {
      if (id.endsWith(".vue?meta")) {
        const meta = tsconfigChecker.getComponentMeta(
          id.replace(/\?meta$/, "")
        );

        const metaProps = meta.props
          .filter((prop) => prop.global === false)
          .map((prop) => ({
            ...prop,
            declarations: undefined,
            schema: undefined,
          }));

        const metaEvents = meta.events.map((event) => ({
          ...event,
          declarations: undefined,
          schema: undefined,
        }));

        const metaValue = {
          props: metaProps,
          events: metaEvents,
        };

        const code = `
<script>
export const meta = ${JSON.stringify(metaValue)};
</script>
`;

        return {
          code,
          map: null,
        };
      }
    },
  };
}

export default vueMeta;
