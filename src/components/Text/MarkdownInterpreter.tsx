import { MDXProvider } from '@mdx-js/react';
import React, { ComponentType, ElementType, ReactNode } from 'react';
import { useTheme } from '../../styles/ThemeContext';

interface MarkdownInterpreterProps {
    markdownModule: {
        default?: ComponentType<{}>; // for dynamically imported MDX
    } | ComponentType<{}>; // for statically imported MDX
}

const MarkdownInterpreter: React.FC<MarkdownInterpreterProps> = ({ markdownModule }) => {

    const { typography } = useTheme()

    const components = {
        h1: ({ children }: { children?: ReactNode }) => <h2 style={typography.header}>{children}</h2>,
        h2: ({ children }: { children?: ReactNode }) => <h3 style={typography.label}>{children}</h3>,
        p: ({ children }: { children?: ReactNode }) => <p style={typography.content}>{children}</p>
    }

    const isComponentType = (
        module: { default?: ComponentType<{}> } | ComponentType<{}>
    ): module is ComponentType<{}> => typeof module === 'function';

    const Markdown: ElementType = isComponentType(markdownModule)
        ? markdownModule
        : markdownModule.default || (() => <></>);

    return (
        <MDXProvider components={components}>
            <Markdown />
        </MDXProvider>
    );
};


export default MarkdownInterpreter;