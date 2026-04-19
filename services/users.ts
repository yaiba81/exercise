import { supabaseConfig } from "@/config/supabase-config";
import { IUser } from "@/interfaces";

export const registerNewUser = async (payload: Partial<IUser>) => {
  try {
    const { data, error } = await supabaseConfig.auth.signUp({
      email: payload.email!,
      password: payload.password!,
    });
    if (error) {
      throw new Error(error.message);
    }

    const { data: profileData, error: profileError } = await supabaseConfig
      .from("user_profiles")
      .insert([
        {
          name: payload.name,
          email: payload.email,
        },
      ]);

    if (profileError) {
      throw new Error(profileError.message);
    }

    return {
      success: true,
      message: "User registerd successfully.",
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "An error occured while registering the user.",
    };
  }
};

export const loginUser = async (payload: {
  email: string;
  password: string;
}) => {
  try {
    const { data, error } = await supabaseConfig.auth.signInWithPassword({
      email: payload.email,
      password: payload.password,
    });
    if (error) {
      throw new Error(error.message);
    }
    return {
      success: true,
      message: "User logged in successfully.",
      data: data,
    };
  } catch (error) {
    throw error;
  }
};

export const getCurrentUserSession = async () => {
  try {
    const session = await supabaseConfig.auth.getSession();
    const sessionData = session.data.session;
    if (!sessionData) {
      return null;
    }
    const email = sessionData.user.email;
    const { data, error } = await supabaseConfig
      .from("user_profiles")
      .select("*")
      .eq("email", email)
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return data as IUser;
  } catch (error) {
    return null;
  }
};
