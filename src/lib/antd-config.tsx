// Ant Design configuration for React 19 compatibility
import { ConfigProvider } from 'antd';
import { ReactNode } from 'react';

// Suppress React 19 compatibility warning
if (typeof window !== 'undefined') {
  const originalConsoleWarn = console.warn;
  console.warn = (...args: unknown[]) => {
    // Suppress specific Ant Design warnings
    if (
      args[0]?.includes?.('antd v5 support React is 16 ~ 18') ||
      args[0]?.includes?.('compatible') ||
      args[0]?.includes?.('React 19')
    ) {
      return;
    }
    originalConsoleWarn.apply(console, args);
  };
}

// Custom Ant Design theme configuration
export const antdTheme = {
  token: {
    // Primary color
    colorPrimary: '#74794f',
    // Success color
    colorSuccess: '#52c41a',
    // Error color
    colorError: '#ff4d4f',
    // Warning color
    colorWarning: '#faad14',
    // Info color
    colorInfo: '#1890ff',
    // Border radius
    borderRadius: 8,
    // Font family
    fontFamily: 'var(--font-geist-sans), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  },
  components: {
    Modal: {
      borderRadius: 12,
      paddingLG: 32,
    },
    Button: {
      borderRadius: 8,
      fontWeight: 500,
    },
    Card: {
      borderRadius: 12,
      paddingLG: 24,
    },
    Form: {
      labelFontSize: 16,
      labelColor: '#111827',
    },
    Input: {
      borderRadius: 8,
      paddingInline: 16,
      paddingBlock: 12,
    },
    Select: {
      borderRadius: 8,
    },
  },
};

// Ant Design ConfigProvider wrapper
export function AntdConfigProvider({ children }: { children: ReactNode }) {
  return (
    <ConfigProvider theme={antdTheme}>
      {children}
    </ConfigProvider>
  );
}
