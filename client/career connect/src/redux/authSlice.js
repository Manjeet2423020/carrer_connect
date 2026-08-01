import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { loginApi, registerApi, logoutApi, getProfileApi } from '../services/auth.service';

// Initial Local Storage State
const savedUser = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;

// ==========================================
// ⚡ ASYNC THUNKS (API Calls inside Redux)
// ==========================================

// 🔑 Login Thunk
export const loginUserThunk = createAsyncThunk(
    'auth/loginUser',
    async (credentials, { rejectWithValue }) => {
        try {
            const data = await loginApi(credentials);
            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Login failed!');
        }
    }
);

// 📝 Register Thunk
export const registerUserThunk = createAsyncThunk(
    'auth/registerUser',
    async (userData, { rejectWithValue }) => {
        try {
            const data = await registerApi(userData);
            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Registration failed!');
        }
    }
);

// 👤 Fetch Profile Thunk (Session Restore)
export const fetchUserProfileThunk = createAsyncThunk(
    'auth/fetchUserProfile',
    async (_, { rejectWithValue }) => {
        try {
            const data = await getProfileApi();
            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Session expired!');
        }
    }
);

// 🚪 Logout Thunk
export const logoutUserThunk = createAsyncThunk(
    'auth/logoutUser',
    async () => {
        try {
            await logoutApi();
        } catch (err) {
            console.error('Logout error:', err);
        }
    }
);

// ==========================================
// 📦 AUTH REDUX SLICE
// ==========================================

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: savedUser,
        loading: false,
        error: null,
        isAuthenticated: !!savedUser,
    },
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Login Cases
            .addCase(loginUserThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUserThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.data.user;
                state.isAuthenticated = true;
                localStorage.setItem('accessToken', action.payload.data.accessToken);
                localStorage.setItem('user', JSON.stringify(action.payload.data.user));
            })
            .addCase(loginUserThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Register Cases
            .addCase(registerUserThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUserThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.data.user;
                state.isAuthenticated = true;
                localStorage.setItem('accessToken', action.payload.data.accessToken);
                localStorage.setItem('user', JSON.stringify(action.payload.data.user));
            })
            .addCase(registerUserThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Fetch Profile Cases
            .addCase(fetchUserProfileThunk.fulfilled, (state, action) => {
                state.user = action.payload.data;
                state.isAuthenticated = true;
                localStorage.setItem('user', JSON.stringify(action.payload.data));
            })
            .addCase(fetchUserProfileThunk.rejected, (state) => {
                state.user = null;
                state.isAuthenticated = false;
                localStorage.removeItem('accessToken');
                localStorage.removeItem('user');
            })

            // Logout Case
            .addCase(logoutUserThunk.fulfilled, (state) => {
                state.user = null;
                state.isAuthenticated = false;
                localStorage.removeItem('accessToken');
                localStorage.removeItem('user');
            });
    },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;
