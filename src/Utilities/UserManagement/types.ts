export interface ItemTemplateProps {
    item: string,
    name: string,
    style?: string,
    onPress?: (arg: any) => any,
}

export interface IdsInterface {
    (): Promise<string>;
}