const testEndpoints = async () => {
  const baseUrl = 'http://localhost:5050/api';
  console.log('--- STARTING SAFEHERCAMPUS BACKEND VERIFICATION TESTS ---');
  
  let token = '';
  let incidentId = '';

  try {
    // 1. REGISTER
    console.log('\n[1/7] Testing Register Endpoint (POST /api/auth/register)...');
    const registerResponse = await fetch(`${baseUrl}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fullName: 'Jane Doe',
        email: `jane.doe.${Date.now()}@university.edu`, // unique email
        faculty: 'Faculty of Science',
        academicYear: '3rd Year',
        password: 'password123'
      })
    });
    const registerData = await registerResponse.json();
    if (!registerResponse.ok) throw new Error(registerData.message || 'Register failed');
    token = registerData.token;
    console.log('✅ Registration Successful! Token acquired.');

    // 2. LOGIN
    console.log('\n[2/7] Testing Login Endpoint (POST /api/auth/login)...');
    const loginResponse = await fetch(`${baseUrl}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: registerData.user.email,
        password: 'password123'
      })
    });
    const loginData = await loginResponse.json();
    if (!loginResponse.ok) throw new Error(loginData.message || 'Login failed');
    console.log('✅ Login Successful! User authenticated:', loginData.user.fullName);

    // 3. GET ME PROFILE
    console.log('\n[3/7] Testing User Profile Endpoint (GET /api/auth/me)...');
    const meResponse = await fetch(`${baseUrl}/auth/me`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const meData = await meResponse.json();
    if (!meResponse.ok) throw new Error(meData.message || 'Profile check failed');
    console.log('✅ Profile Fetch Successful! Retrieved profile details for:', meData.fullName);

    // 4. REPORT INCIDENT
    console.log('\n[4/7] Testing Incident Reporting (POST /api/incidents)...');
    const reportResponse = await fetch(`${baseUrl}/incidents`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        title: 'Flickering lights near library annex',
        category: 'Poor Lighting',
        location: 'Library Annex West Path',
        date: new Date().toISOString().split('T')[0],
        anonymous: true,
        description: 'Path is extremely dark after 7 PM as three lampposts are out.'
      })
    });
    const reportData = await reportResponse.json();
    if (!reportResponse.ok) throw new Error(reportData.message || 'Incident submit failed');
    incidentId = reportData._id;
    console.log('✅ Incident Submission Successful! Report ID:', incidentId);

    // 5. GET STATS
    console.log('\n[5/7] Testing Analytics Statistics (GET /api/incidents/stats)...');
    const statsResponse = await fetch(`${baseUrl}/incidents/stats`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const statsData = await statsResponse.json();
    if (!statsResponse.ok) throw new Error(statsData.message || 'Stats fetch failed');
    console.log('✅ Analytics Statistics fetched! Campus Safety Index Score:', statsData.safetyScore + '%');

    // 6. PROGRESS STATUS
    console.log('\n[6/7] Testing Status Progress Tracking (PUT /api/incidents/:id/status)...');
    const updateResponse = await fetch(`${baseUrl}/incidents/${incidentId}/status`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        status: 'Under Investigation',
        adminNotes: 'Security patrol team is reviewing security camera recordings for this block.'
      })
    });
    const updateData = await updateResponse.json();
    if (!updateResponse.ok) throw new Error(updateData.message || 'Status progress failed');
    console.log('✅ Status updated! New status:', updateData.status);

    // 7. AI ASSISTANT CHAT
    console.log('\n[7/7] Testing AI Assistant Chat (POST /api/ai/chat)...');
    const aiResponse = await fetch(`${baseUrl}/ai/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        message: 'I am being followed, what should I do?'
      })
    });
    const aiData = await aiResponse.json();
    if (!aiResponse.ok) throw new Error(aiData.message || 'AI chat failed');
    console.log('✅ AI chat reply received!');
    console.log('🤖 AI Assistant:\n', aiData.reply);

    console.log('\n🌟 ALL SAFEHERCAMPUS BACKEND ENDPOINT TESTS PASSED SUCCESSFULY! 🌟');
  } catch (error) {
    console.error('\n❌ VERIFICATION TEST FAILED:', error.message);
  }
};

testEndpoints();
