export interface SignUpProps {
  customer: {
    firstName: string
    lastName: string
    email: string
    phone: string
    acceptsMarketing: boolean
  }
}

export interface SignUpResponse {
  customerCreate: {
    customer: {
      firstName: string
      lastName: string
      email: string
      phone: string
      acceptsMarketing: boolean
    }
    customerUserErrors: {
      field?: string[];
      message: string;
      code?: string;
    }[];
  }
}

export interface RecoverResult {
  success: boolean;
  email: string;
  errors?: {
    field?: string[];
    message: string;
    code?: string;
  }[];
}

export interface RecoverResponse {
  customerRecover: {
    customerUserErrors: {
      field?: string[];
      message: string;
      code?: string;
    }[];
  };
}

export interface CustomerAccessToken {
  accessToken: string;
  expiresAt: string;
};

export interface ShopifyUserError {
  message: string;
};

export interface ShopifyAccessTokenResponse {
  data: {
    customerAccessTokenCreate: {
      customerAccessToken: CustomerAccessToken | null;
      customerUserErrors: ShopifyUserError[];
    };
  };
};

export interface Customer {
  id: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  phone: string | null;
  acceptsMarketing: boolean;
  orders?: {
    edges: Array<{
      node: {
        orderNumber: number;
        totalPrice: {
          amount: string;
          currencyCode: string;
        };
        processedAt: string;
      };
    }>;
  };
}

export interface CustomerQueryResponse {
  data: {
    customer: Customer | null;
  };
  errors?: Array<{
    message: string;
    locations?: Array<{ line: number; column: number }>;
    path?: string[];
  }>;
}

export interface CustomerInput {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  acceptsMarketing?: boolean;
}

export interface CustomerCreateResponse {
  data: {
    customerCreate: {
      customer: {
        id: string;
        email: string;
        firstName: string;
        lastName: string;
        phone: string;
      } | null;
      customerUserErrors: Array<{
        field: string[];
        message: string;
        code: string;
      }>;
    };
  };
}