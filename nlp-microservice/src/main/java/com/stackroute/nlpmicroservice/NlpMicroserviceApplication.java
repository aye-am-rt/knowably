package com.stackroute.nlpmicroservice;

import com.stackroute.nlpmicroservice.repository.MedicalRepository;
import com.stackroute.nlpmicroservice.repository.MovieRepository;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.kafka.annotation.EnableKafka;

@SpringBootApplication
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EnableEurekaClient
@EnableDiscoveryClient
@EnableKafka
public class NlpMicroserviceApplication implements CommandLineRunner {

	@Autowired
	private MovieRepository movieRepository;
	@Autowired
	private MedicalRepository medicalRepository;

	public static void main(String[] args) {
		SpringApplication.run(NlpMicroserviceApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		movieRepository.deleteAll();
		medicalRepository.deleteAll();
	}
}
