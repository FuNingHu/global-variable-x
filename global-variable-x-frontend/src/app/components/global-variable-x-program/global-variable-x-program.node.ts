import { ProgramNode, TabInputModel, VariableDeclaration } from '@universal-robots/contribution-api';

export interface GlobalVariableXProgramNode extends ProgramNode {
    type: string;
    parameters: {
        variable: VariableDeclaration;
    };
    lockChildren?: boolean;
    allowsChildren?: boolean;
}
