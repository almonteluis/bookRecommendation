// Simple test script for rating API
const API_BASE_URL = "http://localhost:5004";

async function testRatingAPI() {
  console.log("🧪 Testing Rating API...\n");

  try {
    // Test 1: Submit a rating
    console.log("1. Submitting a rating...");
    const submitResponse = await fetch(`${API_BASE_URL}/api/ratings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: "user-1",
        bookId: "test-book-1",
        rating: 4,
      }),
    });

    if (submitResponse.ok) {
      const rating = await submitResponse.json();
      console.log("✅ Rating submitted:", rating);
    } else {
      console.log("❌ Failed to submit rating:", submitResponse.statusText);
    }

    // Test 2: Get user rating
    console.log("\n2. Getting user rating...");
    const getUserResponse = await fetch(
      `${API_BASE_URL}/api/ratings/test-book-1/user/user-1`
    );

    if (getUserResponse.ok) {
      const userRating = await getUserResponse.json();
      console.log("✅ User rating retrieved:", userRating);
    } else {
      console.log("❌ Failed to get user rating:", getUserResponse.statusText);
    }

    // Test 3: Get rating stats
    console.log("\n3. Getting rating stats...");
    const getStatsResponse = await fetch(
      `${API_BASE_URL}/api/ratings/test-book-1/stats`
    );

    if (getStatsResponse.ok) {
      const stats = await getStatsResponse.json();
      console.log("✅ Rating stats retrieved:", stats);
    } else {
      console.log(
        "❌ Failed to get rating stats:",
        getStatsResponse.statusText
      );
    }

    // Test 4: Submit another rating from different user
    console.log("\n4. Submitting rating from another user...");
    const submitResponse2 = await fetch(`${API_BASE_URL}/api/ratings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: "user-2",
        bookId: "test-book-1",
        rating: 5,
      }),
    });

    if (submitResponse2.ok) {
      const rating2 = await submitResponse2.json();
      console.log("✅ Second rating submitted:", rating2);
    } else {
      console.log(
        "❌ Failed to submit second rating:",
        submitResponse2.statusText
      );
    }

    // Test 5: Get updated stats
    console.log("\n5. Getting updated rating stats...");
    const getUpdatedStatsResponse = await fetch(
      `${API_BASE_URL}/api/ratings/test-book-1/stats`
    );

    if (getUpdatedStatsResponse.ok) {
      const updatedStats = await getUpdatedStatsResponse.json();
      console.log("✅ Updated rating stats:", updatedStats);
    } else {
      console.log(
        "❌ Failed to get updated stats:",
        getUpdatedStatsResponse.statusText
      );
    }

    console.log("\n🎉 Rating API test completed!");
  } catch (error) {
    console.error("❌ Test failed with error:", error.message);
  }
}

// Run the test
testRatingAPI();
