BEGIN;

DO $$
DECLARE
    admin_id UUID := '00000000-0000-0000-0000-000000000001';
BEGIN
    -- Clean up existing admin to ensure password is set correctly
    DELETE FROM auth.identities WHERE user_id IN (SELECT id FROM auth.users WHERE email = 'admin@worstfriends.com');
    DELETE FROM auth.users WHERE email = 'admin@worstfriends.com';
    
    INSERT INTO auth.users (
        instance_id,
        id,
        aud,
        role,
        email,
        encrypted_password,
        email_confirmed_at,
        recovery_sent_at,
        last_sign_in_at,
        raw_app_meta_data,
        raw_user_meta_data,
        created_at,
        updated_at,
        confirmation_token,
        email_change,
        email_change_token_new,
        recovery_token,
        is_super_admin,
        phone_confirmed_at
    )
    VALUES (
        '00000000-0000-0000-0000-000000000000',
        admin_id,
        'authenticated',
        'authenticated',
        'admin@worstfriends.com',
        crypt('Admin123!', gen_salt('bf')),
        now(),
        now(),
        now(),
        '{"provider":"email","providers":["email"]}',
        '{}',
        now(),
        now(),
        '',
        '',
        '',
        '',
        false,
        now()
    );

    INSERT INTO auth.identities (
        id,
        provider_id,
        user_id,
        identity_data,
        provider,
        last_sign_in_at,
        created_at,
        updated_at
    )
    VALUES (
        gen_random_uuid(),
        admin_id,
        admin_id,
        format('{"sub":"%s","email":"%s"}', admin_id::text, 'admin@worstfriends.com')::jsonb,
        'email',
        now(),
        now(),
        now()
    );
END $$;

COMMIT;