package com.example.userservice.controller;

import com.example.userservice.dto.UserDto;
import com.example.userservice.entity.UserEntity;
import com.example.userservice.service.UserService;
import com.example.userservice.vo.RequestLogin;
import com.example.userservice.vo.RequestUser;
import com.example.userservice.vo.Response;
import com.example.userservice.vo.ResponseUser;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/")
@Slf4j
public class UsersController {

    private final UserService userService;
    private final Environment env;

    @ApiOperation(value="상태 확인", notes="user-service의 상태 확인")
    @GetMapping("/health_check")
    public String status(HttpServletRequest request) {
        log.info("health_check 요청");
        return String.format("It's Working in User Service," +
                "port(local.server.port)=%s, port(server.port)=%s" +
                "token_secret=%s, token_expiration_time=%s, gateway_ip=%s",
                env.getProperty("local.server.port"), env.getProperty("server.port"),
                env.getProperty("token.secret"), env.getProperty("token.expiration_time"), env.getProperty("gateway.ip")
        );
    }

    @GetMapping("/welcome")
    public String welcome(){
        //return env.getProperty("greeting.message");
        return "welcome";
    }

    @ApiOperation(value="회원가입(유저 생성)", notes="user의 정보를 입력하여 유저 생성")
    @PostMapping("/users")
    public ResponseEntity createUser(@RequestBody @Valid RequestUser user){
        Response response = new Response();
        ModelMapper mapper = new ModelMapper();
        mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
        log.info("/users post 요청");
        UserDto userDto = mapper.map(user, UserDto.class);
        userService.createUser(userDto);

        ResponseUser responseUser = mapper.map(userDto, ResponseUser.class);
        response.add("user", responseUser);
//        return ResponseEntity.status(HttpStatus.CREATED).body(responseUser);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @ApiOperation(value="로그인", notes="securtiy를 사용하지 않고 로그인")
    @PostMapping("/nosec/login")
    public ResponseEntity login(@RequestBody @Valid RequestLogin user, HttpServletResponse response){

        // 계정 검사
        String token = Jwts.builder()
                .claim("email", user.getEmail())
                .claim("id", "아이디 디비검색해서 가져오기")
                .claim("userId", "유저아이디 검색해서 가져오기")
//                        .setSubject(userDetails.getEmail()).setSubject(String.valueOf(userDetails.getId())).setSubject(userDetails.getUserId())
                .setExpiration(new Date(System.currentTimeMillis() + Long.parseLong(env.getProperty("token.expiration_time"))))
                .signWith(SignatureAlgorithm.HS512, env.getProperty("token.secret"))
                .compact();
        System.out.println(env.getProperty("token.secret"));
        response.addHeader("token", token);
//todo cookie 필요할 수도 있음
//        response.addCookie("token", token);
        response.addHeader("userId", "디비검색해서 보내주기");
        
        
        log.info("no security login");
        ModelMapper mapper = new ModelMapper();
        mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
        log.info("/users post 요청");
        UserDto userDto = mapper.map(user, UserDto.class);
//        userService.createUser(userDto);

        ResponseUser responseUser = mapper.map(userDto, ResponseUser.class);

        return ResponseEntity.status(HttpStatus.CREATED).body(responseUser);
    }

    //전체 사용자 목록
    @ApiOperation(value="로그인", notes="securtiy를 사용하여 로그인")
    @GetMapping("/users")
    public ResponseEntity<List<ResponseUser>> getUser(){
        Iterable<UserEntity> users = userService.getUserByAll();

        ModelMapper mapper = new ModelMapper();
        mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);

        List<ResponseUser> responseUsers = new ArrayList<>();
        users.forEach(v -> new ModelMapper().map(v, ResponseUser.class));

        return ResponseEntity.status(HttpStatus.OK).body(responseUsers);
    }

    // 사용자 상세보기 (with 주문 목록)
    @ApiOperation(value="유저의 주문 내역", notes="유저의 모든 주문 내역")
    @GetMapping("/users/{userId}")
    public ResponseEntity<ResponseUser> getUser(@PathVariable String userId){
        UserDto userDto = userService.getUserByUserId(userId);

        ResponseUser returnValue = new ModelMapper().map(userDto, ResponseUser.class);

        return ResponseEntity.status(HttpStatus.OK).body(returnValue);
    }

//    @PostMapping("/api/ip")
//    public ResponseEntity<String> ip (HttpServletRequest request) {
//        // 요청을 보낸 클라이언트의 IP주소를 반환합니다.
//        log.info("api/ip 요청");
//        return ResponseEntity.ok(request.getRemoteAddr());
//    }

}
