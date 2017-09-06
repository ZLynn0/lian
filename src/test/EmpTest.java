package test;

import java.io.IOException;
import java.io.InputStream;
import java.util.Date;
import java.util.List;

import mapper.EmpMapper;

import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;
import org.junit.Test;

import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;

import entity.Emp;

public class EmpTest {
	private static SqlSessionFactory factory=null;
	static{
		String resourse="mybatis-core.xml";

			InputStream inputStream;
			try {
				inputStream = Resources.getResourceAsStream(resourse);
				factory=new SqlSessionFactoryBuilder().build(inputStream);

			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			
			
	}
	@Test
	public void testempno(){
		SqlSession session=factory.openSession();
		EmpMapper mapper=session.getMapper(EmpMapper.class);
//		Emp emp=mapper.getEmpByEmpno(7369);
//		System.out.println(emp);
		Page<Emp> page=PageHelper.startPage(1,2);
		List<Emp> list=mapper.emplist();
		System.out.println(list);
		PageInfo<Emp> pageInfo=new PageInfo<Emp>(list);
		for (Emp e: list) {
			System.out.println(e);
		}
		
		
		
	}
	@Test
	public void testinsert(){
		SqlSession session=factory.openSession();
		EmpMapper mapper=session.getMapper(EmpMapper.class);
		Emp emp=new Emp(333, "111", "11", 7902, new Date(), 11.0, 11.0, 50);
		
		mapper.insert(emp);
		session.commit();
		session.close();
		System.out.println("插入");
	}	
	@Test
	public void testupdate(){
		SqlSession session=factory.openSession();
		EmpMapper mapper=session.getMapper(EmpMapper.class);
		Date date=new Date();
		Emp emp=new Emp(12, "222", "2222", 7902, date, 11.0, 11.0, 50);
		mapper.update(emp);
		session.commit();
		session.close();
	}
	@Test
	public void testdelete(){
		SqlSession session=factory.openSession();
		EmpMapper mapper=session.getMapper(EmpMapper.class);
		
		Integer empno=12;
		mapper.delete(empno);
		session.commit();
		session.close();
	}

}
