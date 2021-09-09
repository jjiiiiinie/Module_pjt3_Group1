package com.example.catalogservice.controller;

import com.example.catalogservice.dto.CatalogDto;
import com.example.catalogservice.entity.CatalogEntity;
import com.example.catalogservice.jpa.CatalogRepository;
import com.example.catalogservice.service.CatalogService;
import com.example.catalogservice.vo.RequestCatalog;
import com.example.catalogservice.vo.RequestSearch;
import com.example.catalogservice.vo.ResponseCatalog;
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
import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/")
@Slf4j
public class CatalogController {
    private final Environment env;
    private final CatalogService catalogService;
    private final CatalogRepository catalogRepository;

    //todo 카테고리 변경하기
    private final String CATEGORY = "category";
    private final String KEYWORD = "keyword";
    private final String ID = "id";
    private final String DATE = "date";

    @GetMapping("/health_check")
    public String status(HttpServletRequest request){
        return String.format("It's Working in Catalog Service on Port %s", request.getServerPort());
    }

    @ApiOperation(value="전체 상품 목록", notes="전체 상품 목록")
    @GetMapping("/catalogs")
    public ResponseEntity<List<ResponseCatalog>> getCatalogs(){
        Iterable<CatalogEntity> orderList = catalogService.getAllCatalogs();

        List<ResponseCatalog> result = new ArrayList<>();
        orderList.forEach(v -> {
            result.add(new ModelMapper().map(v, ResponseCatalog.class));
        });

        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    @ApiOperation(value="상세 상품 조회", notes="상세 상품 조회: 카트에서 feignClient를 사용하여 접근")
    @GetMapping("/catalogs/client/{productId}")
    public ResponseEntity<ResponseCatalog> getCatalog(@PathVariable("productId") Long productId){
        log.info("Before retrieve catalgos data");
        CatalogEntity catalog = catalogRepository.findById(productId).get();

        ResponseCatalog result = new ModelMapper().map(catalog, ResponseCatalog.class);
        log.info("After retrieve catalgos data");

        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    @ApiOperation(value="상품 등록", notes="상품 등록")
    @PostMapping("/catalogs")
    public ResponseEntity createCatalogs(@RequestBody @Valid RequestCatalog catalog, HttpServletRequest request){
        //todo 이미지 받고 경로설정
        //todo 책 중복 검사(isbn 등) or 권한 검사(only admin) => 원래 apigateway에서 filter에 auth(jwt 검증) 추가해서 확인해도됨
        //todo 에러 메세지

        // email == "admin"일 때나 apigateway를 거쳐서 헤더값을 받아서 처리
        log.info(request.getHeader("email"));
        ModelMapper mapper = new ModelMapper();
        mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
        CatalogDto catalogDto = mapper.map(catalog, CatalogDto.class);
        catalogService.createCatalog(catalogDto);

        ResponseCatalog responseCatalog = mapper.map(catalogDto, ResponseCatalog.class);

        return ResponseEntity.status(HttpStatus.CREATED).body(responseCatalog);
    }

    @ApiOperation(value="상품 수정", notes="상품 수정")
    @PutMapping("/catalogs/{productId}")
    public ResponseEntity updateCatalogsById(@RequestBody RequestCatalog catalog, @PathVariable Long productId){
        //todo 이미지 받고 경로설정
        //todo  중복 검사 or 권한 검사(only admin) => create와 같이 한번에 묶어서 검사?filter?
        //todo 수정시 생성일 기존값, 수정일 변경 설정
        ModelMapper mapper = new ModelMapper();
        mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
        CatalogDto catalogDto = mapper.map(catalog, CatalogDto.class);
        catalogDto.setProductId(productId);
        catalogService.updateCatalog(catalogDto);

        ResponseCatalog responseCatalog = mapper.map(catalogDto, ResponseCatalog.class);

        return ResponseEntity.status(HttpStatus.CREATED).body(responseCatalog);
    }

    @ApiOperation(value="카테고리별 상품 목록", notes = "카테고리별 상품 목록")
    @GetMapping("/catalogs/{category}")
    public ResponseEntity<List<ResponseCatalog>> getCatalogByCategory(@PathVariable("category") String category){
        //log.info("Before retrieve catalgos data");
        List<CatalogEntity> catalogList = catalogRepository.findByCategory(category);
        List<ResponseCatalog> result = new ArrayList<>();
        //log.info("After retrieve catalgos data");
        catalogList.forEach(v -> {
            result.add(new ModelMapper().map(v, ResponseCatalog.class));
        });

        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    @ApiOperation(value = "상품 검색", notes = "상품 아이디, 상품 이름, 출판일 검색")
    // value, start, end post형태로 보내기
    @PostMapping("/catalogs/{type}")
    public ResponseEntity searchCategory(@PathVariable("type") String type, @RequestBody RequestSearch requestSearch){
        //log.info("Before retrieve catalgos data");
        // todo 검색 논리 더 단순화 가능할 것 같음
        List<CatalogEntity> catalogList = new ArrayList<>();
        if(type.equals(ID)){
//            if(requestSearch.getValue().)
            catalogList.add(catalogRepository.findById(Long.parseLong(requestSearch.getValue())).get());
        }else if(type.equals(KEYWORD)){
            catalogList = catalogRepository.findByProductNameContaining(requestSearch.getValue());
        }else if(type.equals(DATE)){
            catalogList =
                    catalogRepository.findByPublishDateBetween(requestSearch.getStart(), requestSearch.getEnd());
        }

        List<ResponseCatalog> result = new ArrayList<>();
        //log.info("After retrieve catalgos data");
        catalogList.forEach(v -> {
            result.add(new ModelMapper().map(v, ResponseCatalog.class));
        });
        //log.info("After retrieve catalgos data");
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }
}
