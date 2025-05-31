import { ProgramNode, TabInputModel, URVariable } from '@universal-robots/contribution-api';

export interface GlobalVariableXProgramNode extends ProgramNode {
    type: string;
    parameters?: {
        variable: URVariable;
    };
    lockChildren?: boolean;
    allowsChildren?: boolean;
}
