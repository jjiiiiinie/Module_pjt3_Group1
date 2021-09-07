package com.example.catalogservice.controller;

import com.example.catalogservice.dto.CatalogDto;
import com.example.catalogservice.entity.CatalogEntity;
import com.example.catalogservice.jpa.CatalogRepository;
import com.example.catalogservice.service.CatalogService;
import com.example.catalogservice.vo.RequestCatalog;
import com.example.catalogservice.vo.RequestSearch;
import com.example.catalogservice.vo.ResponseCatalog;
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
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/")
@Slf4j
public class CatalogController {
    private final Environment env;
    private final CatalogService catalogService;
    private final CatalogRepository catalogRepository;

    private final String CATEGORY = "category";
    private final String KEYWORD = "keyword";
    private final String ID = "id";
    private final String DATE = "date";

    @GetMapping("/health_check")
    public String status(HttpServletRequest request){
        return String.format("It's Working in Catalog SErvice on Port %s", request.getServerPort());
    }

    @GetMapping("/catalogs")
    public ResponseEntity<List<ResponseCatalog>> getCatalogs(){
        Iterable<CatalogEntity> orderList = catalogService.getAllCatalogs();

        List<ResponseCatalog> result = new ArrayList<>();
        orderList.forEach(v -> {
            result.add(new ModelMapper().map(v, ResponseCatalog.class));
        });

        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    @PostMapping("/catalogs")
    public ResponseEntity createCatalogs(@RequestBody @Valid RequestCatalog catalog){
        //todo 이미지 받고 경로설정
        //todo 책 중복 검사(isbn 등) or 권한 검사(only admin)

        ModelMapper mapper = new ModelMapper();
        mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
        CatalogDto catalogDto = mapper.map(catalog, CatalogDto.class);
        catalogService.createCatalog(catalogDto);

        ResponseCatalog responseCatalog = mapper.map(catalogDto, ResponseCatalog.class);

        return ResponseEntity.status(HttpStatus.CREATED).body(responseCatalog);
    }

    @PutMapping("/catalogs/{productId}")
    public ResponseEntity updateCatalogsById(@RequestBody RequestCatalog catalog, @PathVariable Long productId){
        //todo 이미지 받고 경로설정
        //todo  중복 검사 or 권한 검사(only admin) => create와 같이 한번에 묶어서 검사?filter?
        //todo 수정시 생성일 기존값, 수정일 변경 설정
        ModelMapper mapper = new ModelMapper();
        mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
        CatalogDto catalogDto = mapper.map(catalog, CatalogDto.class);
        catalogDto.setId(productId);
        catalogService.updateCatalog(catalogDto);

        ResponseCatalog responseCatalog = mapper.map(catalogDto, ResponseCatalog.class);

        return ResponseEntity.status(HttpStatus.CREATED).body(responseCatalog);
    }

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

    // value, start, end post형태로 보내기
    @PostMapping("/catalogs/{type}")
    public ResponseEntity searchCategory(@PathVariable("type") String type, @RequestBody RequestSearch requestSearch){
        //log.info("Before retrieve catalgos data");
        CatalogEntity catalog = null;
        if(type.equals(ID)){
            catalog = catalogRepository.findById(Long.parseLong(requestSearch.getValue())).get();
        }else if(type.equals(KEYWORD)){
            catalog = catalogRepository.findByProductNameLike(requestSearch.getValue());
        }else if(type.equals(DATE)){
            List<CatalogEntity> catalogList =
                    catalogRepository.findByPublishDateBetween(requestSearch.getStart(), requestSearch.getEnd());

            return ResponseEntity.status(HttpStatus.OK).body(catalogList);
        }

        ResponseCatalog result = new ModelMapper().map(catalog, ResponseCatalog.class);
        //log.info("After retrieve catalgos data");
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }
}
