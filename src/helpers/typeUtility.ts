/* eslint no-use-before-define: "off", import/export: "off", space-infix-ops: "off"  */

/**
 * Reference: https://medium.com/@martin_hotell/improved-redux-type-safety-with-typescript-2-8-2c11a8062575
 */

type FunctionType = (...args: any[]) => any;
type ActionCreatorMapObject = { [actionCreator: string]: FunctionType };

export type ActionsUnion<A extends ActionCreatorMapObject> = ReturnType<A[keyof A]>;