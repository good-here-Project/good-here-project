package bitcamp.goodhere.controller;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Collections;
import java.util.Map;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.configurationprocessor.json.JSONObject;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;
import bitcamp.goodhere.service.MemberService;
import bitcamp.goodhere.vo.Member;
import bitcamp.util.RestResult;
import bitcamp.util.RestStatus;
import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/auth")
public class AuthController {

  Logger log = LogManager.getLogger(getClass());

  {
    log.trace("AuthController 생성됨!");
  }

  @Autowired private MemberService memberService;

  @PostMapping("login")
  public Object login(
      String email,
      String password,
      HttpSession session) {

    Member member = null;

    member = memberService.get(email, password);

    //    System.out.println(member);

    if (member != null) {
      session.setAttribute("loginUser", member);
      //      System.out.println(session);
      //      System.out.println(member);
      return new RestResult()
          .setStatus(RestStatus.SUCCESS);
    } else {
      return new RestResult()
          .setStatus(RestStatus.FAILURE);
    }
  }

  @GetMapping("logout")
  public Object logout(HttpSession session) {
    session.invalidate();
    return new RestResult()
        .setStatus(RestStatus.SUCCESS);
  }

  @RequestMapping("user")
  public Object user(HttpSession session) {
    Member loginUser = (Member) session.getAttribute("loginUser");
    System.out.println(session);
    System.out.println(loginUser);
    if (loginUser != null) {
      return new RestResult()
          .setStatus(RestStatus.SUCCESS)
          .setData(loginUser);
    } else {
      return new RestResult()
          .setStatus(RestStatus.FAILURE);
    }
  }

  @PostMapping("facebookLogin")
  public Object facebookLogin(
      @RequestBody Map<String,String> jsonData,
      HttpSession session) throws Exception {

    // 클라이언트가 보낸 accessToken을 가지고
    // 페이스북 서버에 접속(AJAX 요청)하여 사용자를 정보를 가져온다.
    //
    RestTemplate restTemplate = new RestTemplate();

    @SuppressWarnings("rawtypes")
    Map result = restTemplate.getForObject(
        "https://graph.facebook.com/v16.0/me?access_token={value1}&fields={value2}", // 요청할 URL
        Map.class, // 서버에서 받은 결과의 타입
        jsonData.get("accessToken"), // URL의 첫 번째 자리에 들어갈 값
        "id,name,email,gender" // 페이스북 측에 요청하는 로그인 사용자 정보
        );

    // 페이스북에서 받은 데이터에서 이메일과 이름을 꺼낸다.
    @SuppressWarnings("null")
    String email = (String) result.get("email");
    String name = (String) result.get("name");

    // 기존 회원 정보 가져오기
    Member user = memberService.get(email);
    if (user == null) {
      // 페이스북에서 받은 최소 정보를 가지고 회원 가입을 위한 객체를 준비한다.
      Member m = new Member();
      m.setEmail(email);
      m.setName(name);
      m.setPassword("bitcamp-nopassword");
      m.setTel("010-0000-0000");
      m.setNickname("페이스북");

      // 회원 가입을 수행한다.
      memberService.add(m);
    }
    user = memberService.get(email);

    // 세션에 로그인 사용자 정보 보관
    session.setAttribute("loginUser", user);

    return new RestResult()
        .setStatus(RestStatus.SUCCESS);
  }


  @PostMapping("googleLogin")
  public Object googleLogin(
      @RequestBody Map<String,String> jsonData,
      HttpSession session) throws Exception {
    String idToken = jsonData.get("credential");

    // GoogleIdTokenVerifier 인스턴스 생성
    GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(new NetHttpTransport(), new GsonFactory())
        .setAudience(Collections.singletonList("1087840897429-akb84m84c0i06q9p3a81tbglgtqsn28j.apps.googleusercontent.com"))
        .build();

    // ID Token을 검증
    GoogleIdToken googleIdToken = verifier.verify(idToken);
    if (googleIdToken != null) {
      // ID Token에서 정보 추출
      GoogleIdToken.Payload payload = googleIdToken.getPayload();
      String email = payload.getEmail();
      String name = (String) payload.get("name");

      // 기존 회원 정보 가져오기
      Member user = memberService.get(email);
      if (user == null) {
        // 구글에서 받은 최소 정보를 가지고 회원 가입을 위한 객체를 준비한다.
        Member m = new Member();
        m.setEmail(email);
        m.setName(name);
        m.setPassword("bitcamp-nopassword");
        m.setTel("010-0000-0000");
        m.setNickname("구글");

        // 회원 가입을 수행한다.
        memberService.add(m);
      }
      user = memberService.get(email);

      // 세션에 로그인 사용자 정보 보관
      session.setAttribute("loginUser", user);

      return new RestResult()
          .setStatus(RestStatus.SUCCESS);
    } else {
      // ID Token이 검증되지 않은 경우
      return new RestResult()
          .setStatus(RestStatus.FAILURE);
    }
  }

  @PostMapping("naverLogin")
  public Object naverLogin(@RequestBody Map<String, String> params, HttpSession session) {

    String token = params.get("access_token");
    String header = "Bearer " + token;
    String apiURL = "https://openapi.naver.com/v1/nid/me";

    try {
      URL url = new URL(apiURL);
      HttpURLConnection con = (HttpURLConnection) url.openConnection();
      con.setRequestMethod("POST");
      con.setRequestProperty("Authorization", header);

      int responseCode = con.getResponseCode();
      BufferedReader br;

      if (responseCode == 200) {
        br = new BufferedReader(new InputStreamReader(con.getInputStream()));
      } else {
        br = new BufferedReader(new InputStreamReader(con.getErrorStream()));
      }

      String inputLine;
      StringBuffer response = new StringBuffer();

      while ((inputLine = br.readLine()) != null) {
        response.append(inputLine);
      }
      br.close();

      String responseBody = response.toString();
      JSONObject jsonObject = new JSONObject(responseBody);
      JSONObject responseJson = jsonObject.getJSONObject("response");

      String nickname = responseJson.getString("nickname");
      String email = responseJson.getString("email");

      Member user = memberService.get(email);
      if (user == null) {
        Member m = new Member();
        m.setEmail(email);
        m.setNickname(nickname);
        m.setPassword("bitcamp-nopassword");
        m.setTel("010-0000-0000");
        m.setNickname("네이버");

        memberService.add(m);
      }
      user = memberService.get(email);

      session.setAttribute("loginUser", user.getEmail());

      return new RestResult()
          .setStatus(RestStatus.SUCCESS);
    } catch (Exception e) {
      log.error("네이버 로그인 중 에러 발생! : " + e);
      return new RestResult()
          .setStatus(RestStatus.FAILURE);
    }
  }



}









