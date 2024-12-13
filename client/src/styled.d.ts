import "styled-components";

declare module "styled-components" {
    export interface DefaultTheme {
        bgColor: string,
        boxColor: string,
        boardColor: string,
        darker: string,
        lighter: string,
    }
}